import { useState, useRef } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAllVideos, useCreateVideo, useUpdateVideo, useDeleteVideo, Video } from '@/hooks/useVideos';
import { Plus, Pencil, Trash2, Video as VideoIcon, Upload, Link } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Videos = () => {
  const { data: videos = [], isLoading } = useAllVideos();
  const createVideo = useCreateVideo();
  const updateVideo = useUpdateVideo();
  const deleteVideo = useDeleteVideo();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    video_type: 'youtube',
    page_assignment: 'home',
    is_active: true,
    display_order: 0
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      video_url: '',
      video_type: 'youtube',
      page_assignment: 'home',
      is_active: true,
      display_order: 0
    });
    setEditingVideo(null);
    setSelectedFile(null);
    setUploadMode('url');
  };

  const handleOpenDialog = (video?: Video) => {
    if (video) {
      setEditingVideo(video);
      setFormData({
        title: video.title,
        description: video.description || '',
        video_url: video.video_url,
        video_type: video.video_type,
        page_assignment: video.page_assignment,
        is_active: video.is_active,
        display_order: video.display_order
      });
      setUploadMode('url');
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        toast.error('Please select a valid video file');
        return;
      }
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        toast.error('File size must be less than 100MB');
        return;
      }
      setSelectedFile(file);
      setFormData({ ...formData, video_type: 'upload' });
    }
  };

  const uploadVideo = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let videoUrl = formData.video_url;
      let videoType = formData.video_type;

      // Handle file upload
      if (uploadMode === 'file' && selectedFile) {
        setIsUploading(true);
        videoUrl = await uploadVideo(selectedFile);
        videoType = 'upload';
      }

      // Validate URL is provided
      if (!videoUrl) {
        toast.error('Please provide a video URL or upload a file');
        return;
      }

      const submitData = {
        ...formData,
        video_url: videoUrl,
        video_type: videoType
      };

      if (editingVideo) {
        await updateVideo.mutateAsync({ id: editingVideo.id, ...submitData });
        toast.success('Video updated successfully');
      } else {
        await createVideo.mutateAsync(submitData);
        toast.success('Video added successfully');
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to save video');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        await deleteVideo.mutateAsync(id);
        toast.success('Video deleted successfully');
      } catch (error) {
        toast.error('Failed to delete video');
        console.error(error);
      }
    }
  };

  const handleToggleActive = async (video: Video) => {
    try {
      await updateVideo.mutateAsync({ id: video.id, is_active: !video.is_active });
      toast.success(`Video ${video.is_active ? 'deactivated' : 'activated'}`);
    } catch (error) {
      toast.error('Failed to update video');
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-3xl font-display font-bold text-foreground">Video Management</h1>
            <p className="text-muted-foreground text-sm mt-1">Add and manage videos displayed on the website</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="gap-2 w-full sm:w-auto">
            <Plus size={20} />
            Add Video
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : videos.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 px-4">
              <VideoIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-center">No videos yet</h3>
              <p className="text-muted-foreground text-sm mb-4 text-center">Add your first video to display on the website</p>
              <Button onClick={() => handleOpenDialog()}>Add Video</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3 md:gap-4">
            {videos.map((video) => (
              <Card key={video.id}>
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    {/* Thumbnail */}
                    <div className="w-full sm:w-24 h-32 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <VideoIcon className="w-8 h-8 text-primary" />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{video.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{video.video_url}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full capitalize">
                          {video.page_assignment}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full capitalize">
                          {video.video_type}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`active-${video.id}`} className="text-sm text-muted-foreground">
                          Active
                        </Label>
                        <Switch
                          id={`active-${video.id}`}
                          checked={video.is_active}
                          onCheckedChange={() => handleToggleActive(video)}
                        />
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(video)}>
                          <Pencil size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(video.id)}>
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto mx-4">
            <DialogHeader>
              <DialogTitle>{editingVideo ? 'Edit Video' : 'Add New Video'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter video title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter video description (optional)"
                  rows={3}
                />
              </div>

              {/* Upload Mode Toggle */}
              <div className="space-y-3">
                <Label>Video Source</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={uploadMode === 'url' ? 'default' : 'outline'}
                    onClick={() => {
                      setUploadMode('url');
                      setSelectedFile(null);
                    }}
                    className="flex-1 gap-2"
                  >
                    <Link size={16} />
                    URL
                  </Button>
                  <Button
                    type="button"
                    variant={uploadMode === 'file' ? 'default' : 'outline'}
                    onClick={() => {
                      setUploadMode('file');
                      setFormData({ ...formData, video_url: '', video_type: 'upload' });
                    }}
                    className="flex-1 gap-2"
                  >
                    <Upload size={16} />
                    Upload File
                  </Button>
                </div>
              </div>

              {uploadMode === 'url' ? (
                <>
                  <div>
                    <Label htmlFor="video_url">Video URL *</Label>
                    <Input
                      id="video_url"
                      value={formData.video_url}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                      placeholder="https://youtube.com/watch?v=... or video file URL"
                      required={uploadMode === 'url'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="video_type">Video Type</Label>
                    <Select
                      value={formData.video_type}
                      onValueChange={(value) => setFormData({ ...formData, video_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="upload">External URL (MP4)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label>Upload Video File</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    {selectedFile ? (
                      <div className="space-y-2">
                        <VideoIcon className="w-10 h-10 mx-auto text-primary" />
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">Click to upload video</p>
                        <p className="text-xs text-muted-foreground">MP4, WebM, MOV up to 100MB</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

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
                  disabled={createVideo.isPending || updateVideo.isPending || isUploading}
                  className="w-full sm:w-auto"
                >
                  {isUploading ? 'Uploading...' : editingVideo ? 'Update Video' : 'Add Video'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Videos;



// import { useState, useRef } from 'react';
// import { AdminLayout } from '@/components/admin/AdminLayout';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label';
// import { useAllVideos, useCreateVideo, useUpdateVideo, useDeleteVideo, Video } from '@/hooks/useVideos';
// import { Plus, Pencil, Trash2, Video as VideoIcon, Upload, Link } from 'lucide-react';
// import { toast } from 'sonner';
// import { supabase } from '@/integrations/supabase/client';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';

// const Videos = () => {
//   const { data: videos = [], isLoading } = useAllVideos();
//   const createVideo = useCreateVideo();
//   const updateVideo = useUpdateVideo();
//   const deleteVideo = useDeleteVideo();

//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingVideo, setEditingVideo] = useState<Video | null>(null);
//   const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url');
//   const [isUploading, setIsUploading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     video_url: '',
//     video_type: 'youtube',
//     page_assignment: 'home',
//     is_active: true,
//     display_order: 0
//   });

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       description: '',
//       video_url: '',
//       video_type: 'youtube',
//       page_assignment: 'home',
//       is_active: true,
//       display_order: 0
//     });
//     setEditingVideo(null);
//     setSelectedFile(null);
//     setUploadMode('url');
//   };

//   const handleOpenDialog = (video?: Video) => {
//     if (video) {
//       setEditingVideo(video);
//       setFormData({
//         title: video.title,
//         description: video.description || '',
//         video_url: video.video_url,
//         video_type: video.video_type,
//         page_assignment: video.page_assignment,
//         is_active: video.is_active,
//         display_order: video.display_order
//       });
//       setUploadMode('url');
//     } else {
//       resetForm();
//     }
//     setIsDialogOpen(true);
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith('video/')) {
//         toast.error('Please select a valid video file');
//         return;
//       }
//       if (file.size > 100 * 1024 * 1024) { // 100MB limit
//         toast.error('File size must be less than 100MB');
//         return;
//       }
//       setSelectedFile(file);
//       setFormData({ ...formData, video_type: 'upload' });
//     }
//   };

//   const uploadVideo = async (file: File): Promise<string> => {
//     const fileExt = file.name.split('.').pop();
//     const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
//     const filePath = `uploads/${fileName}`;

//     const { error: uploadError } = await supabase.storage
//       .from('videos')
//       .upload(filePath, file);

//     if (uploadError) {
//       throw uploadError;
//     }

//     const { data: { publicUrl } } = supabase.storage
//       .from('videos')
//       .getPublicUrl(filePath);

//     return publicUrl;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       let videoUrl = formData.video_url;
//       let videoType = formData.video_type;

//       // Handle file upload
//       if (uploadMode === 'file' && selectedFile) {
//         setIsUploading(true);
//         videoUrl = await uploadVideo(selectedFile);
//         videoType = 'upload';
//       }

//       // Validate URL is provided
//       if (!videoUrl) {
//         toast.error('Please provide a video URL or upload a file');
//         return;
//       }

//       const submitData = {
//         ...formData,
//         video_url: videoUrl,
//         video_type: videoType
//       };

//       if (editingVideo) {
//         await updateVideo.mutateAsync({ id: editingVideo.id, ...submitData });
//         toast.success('Video updated successfully');
//       } else {
//         await createVideo.mutateAsync(submitData);
//         toast.success('Video added successfully');
//       }
//       setIsDialogOpen(false);
//       resetForm();
//     } catch (error) {
//       toast.error('Failed to save video');
//       console.error(error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     if (confirm('Are you sure you want to delete this video?')) {
//       try {
//         await deleteVideo.mutateAsync(id);
//         toast.success('Video deleted successfully');
//       } catch (error) {
//         toast.error('Failed to delete video');
//         console.error(error);
//       }
//     }
//   };

//   const handleToggleActive = async (video: Video) => {
//     try {
//       await updateVideo.mutateAsync({ id: video.id, is_active: !video.is_active });
//       toast.success(`Video ${video.is_active ? 'deactivated' : 'activated'}`);
//     } catch (error) {
//       toast.error('Failed to update video');
//       console.error(error);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-display font-bold text-foreground">Video Management</h1>
//             <p className="text-muted-foreground mt-1">Add and manage videos displayed on the website</p>
//           </div>
//           <Button onClick={() => handleOpenDialog()} className="gap-2">
//             <Plus size={20} />
//             Add Video
//           </Button>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center py-12">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//           </div>
//         ) : videos.length === 0 ? (
//           <Card>
//             <CardContent className="flex flex-col items-center justify-center py-12">
//               <VideoIcon className="h-12 w-12 text-muted-foreground mb-4" />
//               <h3 className="text-lg font-medium">No videos yet</h3>
//               <p className="text-muted-foreground text-sm mb-4">Add your first video to display on the website</p>
//               <Button onClick={() => handleOpenDialog()}>Add Video</Button>
//             </CardContent>
//           </Card>
//         ) : (
//           <div className="grid gap-4">
//             {videos.map((video) => (
//               <Card key={video.id}>
//                 <CardContent className="p-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-24 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <VideoIcon className="w-8 h-8 text-primary" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h3 className="font-medium truncate">{video.title}</h3>
//                       <p className="text-sm text-muted-foreground truncate">{video.video_url}</p>
//                       <div className="flex items-center gap-2 mt-1">
//                         <span className="text-xs px-2 py-0.5 bg-muted rounded-full capitalize">
//                           {video.page_assignment}
//                         </span>
//                         <span className="text-xs px-2 py-0.5 bg-muted rounded-full capitalize">
//                           {video.video_type}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center gap-2">
//                         <Label htmlFor={`active-${video.id}`} className="text-sm text-muted-foreground">
//                           Active
//                         </Label>
//                         <Switch
//                           id={`active-${video.id}`}
//                           checked={video.is_active}
//                           onCheckedChange={() => handleToggleActive(video)}
//                         />
//                       </div>
//                       <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(video)}>
//                         <Pencil size={18} />
//                       </Button>
//                       <Button variant="ghost" size="icon" onClick={() => handleDelete(video.id)}>
//                         <Trash2 size={18} className="text-destructive" />
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}

//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogContent className="max-w-lg">
//             <DialogHeader>
//               <DialogTitle>{editingVideo ? 'Edit Video' : 'Add New Video'}</DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <Label htmlFor="title">Title *</Label>
//                 <Input
//                   id="title"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   placeholder="Enter video title"
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   placeholder="Enter video description (optional)"
//                   rows={3}
//                 />
//               </div>

//               {/* Upload Mode Toggle */}
//               <div className="space-y-3">
//                 <Label>Video Source</Label>
//                 <div className="flex gap-2">
//                   <Button
//                     type="button"
//                     variant={uploadMode === 'url' ? 'default' : 'outline'}
//                     onClick={() => {
//                       setUploadMode('url');
//                       setSelectedFile(null);
//                     }}
//                     className="flex-1 gap-2"
//                   >
//                     <Link size={16} />
//                     URL
//                   </Button>
//                   <Button
//                     type="button"
//                     variant={uploadMode === 'file' ? 'default' : 'outline'}
//                     onClick={() => {
//                       setUploadMode('file');
//                       setFormData({ ...formData, video_url: '', video_type: 'upload' });
//                     }}
//                     className="flex-1 gap-2"
//                   >
//                     <Upload size={16} />
//                     Upload File
//                   </Button>
//                 </div>
//               </div>

//               {uploadMode === 'url' ? (
//                 <>
//                   <div>
//                     <Label htmlFor="video_url">Video URL *</Label>
//                     <Input
//                       id="video_url"
//                       value={formData.video_url}
//                       onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
//                       placeholder="https://youtube.com/watch?v=... or video file URL"
//                       required={uploadMode === 'url'}
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="video_type">Video Type</Label>
//                     <Select
//                       value={formData.video_type}
//                       onValueChange={(value) => setFormData({ ...formData, video_type: value })}
//                     >
//                       <SelectTrigger>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="youtube">YouTube</SelectItem>
//                         <SelectItem value="upload">External URL (MP4)</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </>
//               ) : (
//                 <div className="space-y-2">
//                   <Label>Upload Video File</Label>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="video/*"
//                     onChange={handleFileSelect}
//                     className="hidden"
//                   />
//                   <div
//                     onClick={() => fileInputRef.current?.click()}
//                     className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
//                   >
//                     {selectedFile ? (
//                       <div className="space-y-2">
//                         <VideoIcon className="w-10 h-10 mx-auto text-primary" />
//                         <p className="font-medium">{selectedFile.name}</p>
//                         <p className="text-sm text-muted-foreground">
//                           {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="space-y-2">
//                         <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
//                         <p className="text-muted-foreground">Click to upload video</p>
//                         <p className="text-xs text-muted-foreground">MP4, WebM, MOV up to 100MB</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <Label htmlFor="page_assignment">Display On</Label>
//                 <Select
//                   value={formData.page_assignment}
//                   onValueChange={(value) => setFormData({ ...formData, page_assignment: value })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="home">Home Page</SelectItem>
//                     <SelectItem value="service">Services Page</SelectItem>
//                     <SelectItem value="about">About Page</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label htmlFor="display_order">Display Order</Label>
//                 <Input
//                   id="display_order"
//                   type="number"
//                   value={formData.display_order}
//                   onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
//                   placeholder="0"
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <Switch
//                   id="is_active"
//                   checked={formData.is_active}
//                   onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
//                 />
//                 <Label htmlFor="is_active">Active (visible on website)</Label>
//               </div>

//               <div className="flex justify-end gap-3 pt-4">
//                 <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button 
//                   type="submit" 
//                   disabled={createVideo.isPending || updateVideo.isPending || isUploading}
//                 >
//                   {isUploading ? 'Uploading...' : editingVideo ? 'Update Video' : 'Add Video'}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </AdminLayout>
//   );
// };

// export default Videos;