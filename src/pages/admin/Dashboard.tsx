import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAllVideos } from '@/hooks/useVideos';
import { useContacts } from '@/hooks/useContacts';
import { Video, Mail, Eye, TrendingUp, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { data: videos = [] } = useAllVideos();
  const { data: contacts = [] } = useContacts();
  const navigate = useNavigate();

  const activeVideos = videos.filter(v => v.is_active).length;
  const unreadContacts = contacts.filter(c => !c.is_read).length;

  const stats = [
    {
      title: 'Total Videos',
      value: videos.length,
      icon: Video,
      description: `${activeVideos} active`,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Contact Submissions',
      value: contacts.length,
      icon: Mail,
      description: `${unreadContacts} unread`,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Active Videos',
      value: activeVideos,
      icon: Eye,
      description: 'Visible on website',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'This Month',
      value: contacts.filter(c => {
        const date = new Date(c.created_at);
        const now = new Date();
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }).length,
      icon: TrendingUp,
      description: 'New inquiries',
      color: 'text-amber-600 bg-amber-100'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome to SAARTHAK Admin Panel
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}

          {/* 🔐 UPDATE PASSWORD CARD */}
          <Card
            className="cursor-pointer hover:shadow-md transition"
            onClick={() => navigate('/admin/reset-password')}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Update Password
              </CardTitle>
              <div className="p-2 rounded-lg text-red-600 bg-red-100">
                <KeyRound className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">🔐</div>
              <p className="text-xs text-muted-foreground mt-1">
                Change your account password
              </p>
            </CardContent>
          </Card>
        </div>

        {/* LOWER SECTION */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Contact Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {contacts.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No contact submissions yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {contacts.slice(0, 5).map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {contact.email}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </p>
                        {!contact.is_read && (
                          <span className="inline-block px-2 py-0.5 bg-accent text-accent-foreground text-xs rounded-full">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Videos</CardTitle>
            </CardHeader>
            <CardContent>
              {videos.filter(v => v.is_active).length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No active videos. Add videos to display on the website.
                </p>
              ) : (
                <div className="space-y-4">
                  {videos
                    .filter(v => v.is_active)
                    .slice(0, 5)
                    .map((video) => (
                      <div
                        key={video.id}
                        className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="w-16 h-10 bg-primary/10 rounded flex items-center justify-center">
                          <Video className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {video.title}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {video.page_assignment} page
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
