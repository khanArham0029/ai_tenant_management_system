import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { AuthLayout } from './AuthLayout';
import { SocialButtons } from './SocialButtons';

export function SignupPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-md mx-auto">
                <div className="mb-10 text-center lg:text-left">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">Get Started Now</h1>
                    <p className="text-gray-600 font-medium">Enter your Credentials to create your account</p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-800">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="rounded-xl h-12 border-gray-200 focus:border-[#013557] focus:ring-[#013557] px-4"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-800">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-xl h-12 border-gray-200 focus:border-[#013557] focus:ring-[#013557] px-4"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-semibold text-gray-800">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-xl h-12 border-gray-200 focus:border-[#013557] focus:ring-[#013557] px-4"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2 pt-1 pb-4">
                        <Checkbox id="terms" required className="border-gray-300 text-[#013557] focus:ring-[#013557]" />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
                        >
                            I agree to the <span className="font-semibold underline">terms & policy</span>
                        </label>
                    </div>

                    <Button type="submit" className="w-full bg-[#013557] hover:bg-[#024670] text-white rounded-xl h-12 font-semibold text-base transition-colors">
                        Signup
                    </Button>
                </form>

                <SocialButtons />

                <div className="mt-8 text-center text-sm font-medium text-gray-600">
                    Have an account? <Link to="/" className="text-blue-600 hover:text-blue-700 hover:underline">Sign In</Link>
                </div>
            </div>
        </AuthLayout>
    );
}
