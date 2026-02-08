import { useState, useRef } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAllPosters, useCreatePoster, useUpdatePoster, useDeletePoster, Poster } from '@/hooks/usePosters';
import { Plus, Pencil, Trash2, Image as ImageIcon, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Posters = () => {
  const { data: posters = [], isLoading } = useAllPosters();
  const createPoster = useCreatePoster();
  const updatePoster = useUpdatePoster();
  const deletePoster = useDeletePoster();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPoster, setEditingPoster] = useState<Poster | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    page_assignment: 'home',
    is_active: true,
    display_order: 0
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      page_assignment: 'home',
      is_active: true,
      display_order: 0
    });
    setEditingPoster(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleOpenDialog = (poster?: Poster) => {
    if (poster) {
      setEditingPoster(poster);
      setFormData({
        title: poster.title,
        description: poster.description || '',
        image_url: poster.image_url,
        page_assignment: poster.page_assignment,
        is_active: poster.is_active,
        display_order: poster.display_order
      });
      setPreviewUrl(poster.image_url);
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('posters')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('posters')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image_url;

      // Handle file upload
      if (selectedFile) {
        setIsUploading(true);
        imageUrl = await uploadImage(selectedFile);
      }

      // Validate image URL is provided
      if (!imageUrl) {
        toast.error('Please upload an image');
        return;
      }

      const submitData = {
        ...formData,
        image_url: imageUrl
      };

      if (editingPoster) {
        await updatePoster.mutateAsync({ id: editingPoster.id, ...submitData });
        toast.success('Poster updated successfully');
      } else {
        await createPoster.mutateAsync(submitData);
        toast.success('Poster added successfully');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save poster');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this poster?')) {
      try {
        await deletePoster.mutateAsync(id);
        toast.success('Poster deleted successfully');
      } catch (error) {
        toast.error('Failed to delete poster');
        console.error(error);
      }
    }
  };

  const handleToggleActive = async (poster: Poster) => {
    try {
      await updatePoster.mutateAsync({ id: poster.id, is_active: !poster.is_active });
      toast.success(`Poster ${poster.is_active ? 'deactivated' : 'activated'}`);
    } catch (error) {
      toast.error('Failed to update poster');
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-3xl font-display font-bold text-foreground">Poster Management</h1>
            <p className="text-muted-foreground text-sm mt-1">Add posters for the auto-sliding carousel</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="gap-2 w-full sm:w-auto">
            <Plus size={20} />
            Add Poster
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : posters.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 px-4">
              <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-center">No posters yet</h3>
              <p className="text-muted-foreground text-sm mb-4 text-center">Add your first poster for the carousel</p>
              <Button onClick={() => handleOpenDialog()}>Add Poster</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 md:gap-4">
            {posters.map((poster) => (
              <Card key={poster.id}>
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    {/* Thumbnail */}
                    <div className="w-full sm:w-24 h-32 sm:h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={poster.image_url}
                        alt={poster.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{poster.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{poster.description || 'No description'}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full capitalize">
                          {poster.page_assignment}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                          Order: {poster.display_order}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`active-${poster.id}`} className="text-sm text-muted-foreground">
                          Active
                        </Label>
                        <Switch
                          id={`active-${poster.id}`}
                          checked={poster.is_active}
                          onCheckedChange={() => handleToggleActive(poster)}
                        />
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(poster)}>
                          <Pencil size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(poster.id)}>
                          <Trash2 size={18} className="text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Mobile-friendly Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>{editingPoster ? 'Edit Poster' : 'Add New Poster'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter poster title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter poster description (optional)"
                  rows={2}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Poster Image *</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 md:p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  {previewUrl ? (
                    <div className="space-y-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-32 md:max-h-40 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-muted-foreground">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 md:w-10 md:h-10 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground text-sm">Click to upload image</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG, WebP up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="page_assignment">Display On</Label>
                <Select
                  value={formData.page_assignment}
                  onValueChange={(value) => setFormData({ ...formData, page_assignment: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Page</SelectItem>
                    <SelectItem value="service">Services Page</SelectItem>
                    <SelectItem value="about">About Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active (visible on website)</Label>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createPoster.isPending || updatePoster.isPending || isUploading}
                  className="w-full sm:w-auto"
                >
                  {isUploading ? 'Uploading...' : editingPoster ? 'Update Poster' : 'Add Poster'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Posters;