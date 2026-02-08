import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Eye, EyeOff } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUpdatePassword = async () => {
    setMessage('');

    if (!newPassword || !confirmPassword) {
      setMessage('All fields are required');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);

    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) {
      toast.error('Please login again');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess(true); // ✅ show congratulations screen
    }
  };

  return (
    <AdminLayout>
      <div className="relative min-h-[calc(100vh-4rem)]">
        {/* 🔹 PAGE HEADER */}
        <div className="absolute top-0 left-0">
          <h1 className="text-3xl font-bold">Account Security</h1>
          <p className="text-muted-foreground mt-1">
            Manage your password and security
          </p>
        </div>

        {/* 🔹 CENTER CONTENT */}
        <div className="flex justify-center pt-24">
          {!success ? (
            /* 🔐 PASSWORD FORM */
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle>Update Password</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* NEW PASSWORD */}
                <div className="relative">
                  <Input
                    type={showNew ? 'text' : 'password'}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="relative">
                  <Input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {message && (
                  <p className="text-sm text-center text-red-500">
                    {message}
                  </p>
                )}

                <Button
                  className="w-full"
                  onClick={handleUpdatePassword}
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* 🎉 SUCCESS SCREEN */
            <Card className="w-full max-w-md text-center">
              <CardContent className="py-12 space-y-4">
                <h2 className="text-2xl font-bold text-green-600">
                  🎉 Congratulations!
                </h2>
                <p className="text-muted-foreground">
                  Your password has been updated successfully.
                </p>

                <Button
                  variant="outline"
                  onClick={() => setSuccess(false)}
                >
                  Change Password Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ResetPassword;
