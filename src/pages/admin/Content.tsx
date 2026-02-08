import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Home, Briefcase, Package, Scale, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const contentPages = [
  {
    title: 'Home Page',
    description: 'Edit hero section, services overview, and CTA content',
    icon: Home,
    path: '/admin/content/home',
    available: false
  },
  {
    title: 'Services Page',
    description: 'Manage service categories and descriptions',
    icon: Briefcase,
    path: '/admin/content/services',
    available: false
  },
  {
    title: 'Packages Page',
    description: 'Edit campaign package details and pricing',
    icon: Package,
    path: '/admin/content/packages',
    available: false
  },
  {
    title: 'Legal Page',
    description: 'Update disclaimer, privacy policy, and terms',
    icon: Scale,
    path: '/admin/content/legal',
    available: false
  },
  {
    title: 'About Us Page',
    description: 'Edit company information and team details',
    icon: Users,
    path: '/admin/content/about',
    available: false
  },
  {
    title: 'Footer',
    description: 'Update footer text and contact information',
    icon: FileText,
    path: '/admin/content/footer',
    available: false
  }
];

const Content = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground mt-1">Edit website content and page information</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contentPages.map((page) => (
            <Card key={page.path} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <page.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="mt-2">{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {page.available ? (
                  <Link to={page.path}>
                    <Button className="w-full">Edit Content</Button>
                  </Link>
                ) : (
                  <Button className="w-full" disabled>
                    Coming Soon
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-muted/30">
          <CardContent className="py-6">
            <div className="text-center">
              <h3 className="font-medium text-lg mb-2">Content Management System</h3>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                The full CMS for editing page content is coming soon. For now, you can manage videos 
                and contact submissions from the sidebar. Website content updates will require code changes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Content;
