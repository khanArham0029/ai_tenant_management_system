import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AuthLayout } from './AuthLayout';
import { SocialButtons } from './SocialButtons';

export function LoginPage() {
  const navigate = useNavigate();
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [tenantId, setTenantId] = useState('');

  const handleOwnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/owner');
  };

  const handleTenantLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const id = tenantId || '1';
    navigate(`/tenant/${id}`);
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-gray-600 font-medium">Enter your details to access your account</p>
        </div>

        <Tabs defaultValue="owner" className="w-full" activationMode="manual">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl mb-8 h-12">
            <TabsTrigger
              value="owner"
              className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:text-[#013557] data-[state=active]:shadow-sm text-gray-600 transition-all"
            >
              Owner
            </TabsTrigger>
            <TabsTrigger
              value="tenant"
              className="rounded-lg font-semibold data-[state=active]:bg-white data-[state=active]:text-[#013557] data-[state=active]:shadow-sm text-gray-600 transition-all"
            >
              Tenant
            </TabsTrigger>
          </TabsList>

          <style>{`
            @keyframes tabFadeIn {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .tab-content[data-state="active"] {
              animation: tabFadeIn 0.3s ease-out forwards;
            }
          `}</style>

          <TabsContent value="owner" className="mt-0 outline-none tab-content">
            <form onSubmit={handleOwnerLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="owner-email" className="text-sm font-semibold text-gray-800">Email address</Label>
                <Input
                  id="owner-email"
                  type="email"
                  placeholder="Enter your email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="rounded-xl h-12 border-gray-200 focus:border-[#013557] focus:ring-[#013557] px-4"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-password" className="text-sm font-semibold text-gray-800">Password</Label>
                <Input
                  id="owner-password"
                  type="password"
                  placeholder="Password"
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                  className="rounded-xl h-12 border-gray-200 focus:border-[#013557] focus:ring-[#013557] px-4"
                  required
                />
              </div>

              <div className="flex justify-between items-center pb-4 pt-1">
                <div className="text-sm">
                  {/* Optional Remember me could go here */}
                </div>
                <a href="#" className="text-sm font-semibold text-[#013557] hover:underline">
                  Forgot Password?
                </a>
              </div>

              <Button type="submit" className="w-full bg-[#013557] hover:bg-[#024670] text-white rounded-xl h-12 font-semibold text-base transition-colors">
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="tenant" className="mt-0 outline-none tab-content">
            <form onSubmit={handleTenantLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="tenant-id" className="text-sm font-semibold text-gray-800">Tenant ID</Label>
                <Input
                  id="tenant-id"
                  type="text"
                  placeholder="Enter tenant ID (e.g., 1, 2, 3)"
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                  className="rounded-xl h-12 border-gray-200 focus:border-[#013557] focus:ring-[#013557] px-4"
                  required
                />
              </div>

              <div className="pb-4 pt-1">
                <p className="text-xs text-gray-500">
                  Contact your property manager if you don't know your ID.
                </p>
              </div>

              <Button type="submit" className="w-full bg-[#013557] hover:bg-[#024670] text-white rounded-xl h-12 font-semibold text-base transition-colors">
                Access Portal
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <SocialButtons />

        <div className="mt-8 text-center text-sm font-medium text-gray-600">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-700 hover:underline">Sign Up</Link>
        </div>
      </div>
    </AuthLayout>
  );
}