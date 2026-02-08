import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useContacts, useMarkContactRead } from '@/hooks/useContacts';
import { Mail, Phone, Building, Calendar, Check } from 'lucide-react';
import { toast } from 'sonner';

const Contacts = () => {
  const { data: contacts = [], isLoading } = useContacts();
  const markRead = useMarkContactRead();

  const handleMarkRead = async (id: string) => {
    try {
      await markRead.mutateAsync(id);
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to update');
      console.error(error);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Contact Submissions</h1>
          <p className="text-muted-foreground mt-1">View and manage inquiries from potential clients</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : contacts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No contact submissions yet</h3>
              <p className="text-muted-foreground text-sm">Submissions from the contact form will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className={!contact.is_read ? 'border-l-4 border-l-accent' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {contact.name}
                        {!contact.is_read && (
                          <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            New
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail size={14} />
                          {contact.email}
                        </span>
                        {contact.phone && (
                          <span className="flex items-center gap-1">
                            <Phone size={14} />
                            {contact.phone}
                          </span>
                        )}
                        {contact.organization && (
                          <span className="flex items-center gap-1">
                            <Building size={14} />
                            {contact.organization}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(contact.created_at)}
                        </span>
                      </div>
                    </div>
                    {!contact.is_read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkRead(contact.id)}
                        className="gap-1"
                      >
                        <Check size={14} />
                        Mark Read
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {contact.election_type && (
                    <div className="mb-2">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Election Type:
                      </span>
                      <span className="ml-2 text-sm">{contact.election_type}</span>
                    </div>
                  )}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Contacts;
