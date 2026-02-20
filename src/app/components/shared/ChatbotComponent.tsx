import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotComponentProps {
  userType: 'owner' | 'tenant';
}

export function ChatbotComponent({ userType }: ChatbotComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: userType === 'owner'
        ? 'Hello! I\'m your property management assistant. I can help you with tenant inquiries, rent collection, maintenance requests, and more. How can I assist you today?'
        : 'Hello! I\'m here to help you with your tenancy. You can ask me about your agreement, submit maintenance requests, check your bills, or contact the property owner. How can I help?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: String(Date.now()),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage, userType);
      const botMessage: Message = {
        id: String(Date.now() + 1),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (message: string, type: 'owner' | 'tenant'): string => {
    const lowerMessage = message.toLowerCase();

    if (type === 'owner') {
      if (lowerMessage.includes('rent') || lowerMessage.includes('payment')) {
        return 'I can help you track rent payments. You have 2 pending payments for February 2026. Would you like to mark any as paid or send payment reminders?';
      }
      if (lowerMessage.includes('maintenance') || lowerMessage.includes('request')) {
        return 'You have 2 pending maintenance requests awaiting your approval. Would you like to review them now?';
      }
      if (lowerMessage.includes('tenant') || lowerMessage.includes('contact')) {
        return 'You can view all tenant contact information in the Tenants tab. Would you like me to show you a specific tenant\'s details?';
      }
      if (lowerMessage.includes('bill') || lowerMessage.includes('utility')) {
        return 'You can calculate utility bills in the Utility Bills tab. The system allows you to enter sub-meter readings for each tenant and automatically calculates their bills.';
      }
      if (lowerMessage.includes('agreement') || lowerMessage.includes('expir')) {
        return 'You have 1 agreement expiring within 3 months. Muhammad Ali\'s agreement expires on February 28, 2025. Would you like to send a renewal notice?';
      }
      return 'I can assist you with rent tracking, maintenance approvals, tenant management, utility bills, and agreements. What would you like to know more about?';
    } else {
      // Tenant responses
      if (lowerMessage.includes('rent') || lowerMessage.includes('payment')) {
        return 'Your monthly rent is due on the 1st of every month. The rent payment should be made directly to the property owner. Would you like the payment details?';
      }
      if (lowerMessage.includes('maintenance') || lowerMessage.includes('repair') || lowerMessage.includes('fix')) {
        return 'You can submit a maintenance request through the Maintenance tab. Please describe the issue and select the priority level. The owner will review and approve it.';
      }
      if (lowerMessage.includes('bill') || lowerMessage.includes('utility') || lowerMessage.includes('electric') || lowerMessage.includes('gas')) {
        return 'You can view your utility bills in the Utility Bills tab. Your bills are calculated based on your individual sub-meter readings. Current rates are Rs. 18/unit for electricity and Rs. 25/unit for gas.';
      }
      if (lowerMessage.includes('agreement') || lowerMessage.includes('contract') || lowerMessage.includes('lease')) {
        return 'You can view your complete agreement details in the My Agreement tab, including the terms, duration, and financial information. You can also download a PDF copy.';
      }
      if (lowerMessage.includes('owner') || lowerMessage.includes('contact')) {
        return 'To contact the property owner directly, you can use the contact information provided in your agreement or submit a message through this chat, which will be forwarded to the owner.';
      }
      return 'I can help you with your agreement details, maintenance requests, utility bills, and contacting the owner. What would you like to know more about?';
    }
  };

  const quickReplies = userType === 'owner'
    ? ['Check pending payments', 'View maintenance requests', 'Tenant contacts']
    : ['Submit maintenance request', 'View my bills', 'Contact owner'];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col overflow-hidden border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-lg">Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <ScrollArea className="flex-1 min-h-0 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-indigo-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-lg p-3 ${message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                      }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick replies:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setInputMessage(reply);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <CardContent className="p-4 border-t bg-white m-0">
            <div className="flex gap-2 items-center">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="rounded-full bg-gray-50 border-gray-200 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 px-4 h-10"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="rounded-full w-10 h-10 p-0 flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-transform active:scale-95 disabled:opacity-50"
              >
                <Send className="w-4 h-4 ml-[-2px]" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
