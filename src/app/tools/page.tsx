import Link from 'next/link'
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  CalendarDaysIcon,
  HeartIcon,
  ClockIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline'

const tools = [
  {
    name: "Mood Tracker",
    description: "Daily mood, energy, and symptom tracking with pattern recognition over time",
    href: "/tools/mood-tracker",
    icon: <ChartBarIcon className="h-8 w-8" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200",
    status: "Available Now"
  },
  {
    name: "Journal Templates", 
    description: "Guided journaling prompts for episode tracking and reflection",
    href: "/tools/journal",
    icon: <DocumentTextIcon className="h-8 w-8" />,
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200", 
    status: "Available Now"
  },
  {
    name: "Episode Planner",
    description: "Plan ahead for potential episodes with safety strategies and resources",
    href: "/tools/episode-planner",
    icon: <CalendarDaysIcon className="h-8 w-8" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-200",
    status: "Available Now" 
  },
  {
    name: "Medication Tracker",
    description: "Track medication adherence, side effects, and effectiveness",
    href: "/tools/medication",
    icon: <HeartIcon className="h-8 w-8" />,
    color: "text-red-600", 
    bgColor: "bg-red-50 border-red-200",
    status: "Available Now"
  }
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bipolar Management Tools
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evidence-based tools to help you track patterns, manage symptoms, and 
              communicate effectively with your healthcare team.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>

        {/* Why These Tools Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Use These Tools?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Identify Patterns
              </h3>
              <p className="text-gray-600 text-sm">
                Track your moods, sleep, and triggers to recognize early warning signs 
                and understand your unique patterns.
              </p>
            </div>
            
            <div className="text-center">
              <HeartIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Better Healthcare Communication
              </h3>
              <p className="text-gray-600 text-sm">
                Export your data to share concrete information with doctors, 
                therapists, and other healthcare providers.
              </p>
            </div>
            
            <div className="text-center">
              <ClockIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Proactive Management
              </h3>
              <p className="text-gray-600 text-sm">
                Use insights from your tracking to make informed decisions about 
                treatment, lifestyle changes, and coping strategies.
              </p>
            </div>
          </div>
        </div>

        {/* Research Insights */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-8 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Based on Community Research</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs">68.6%</div>
                <span className="text-blue-800">actively track their mood to identify patterns</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs">39.5%</div>
                <span className="text-blue-800">track sleep as a crucial episode indicator</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs">17.4%</div>
                <span className="text-blue-800">track medication adherence and effects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold text-xs">12.8%</div>
                <span className="text-blue-800">want to track specific symptoms and triggers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-bold text-green-900 mb-2">Your Privacy Matters</h3>
          <p className="text-green-800 text-sm">
            All tools store data locally on your device. Nothing is shared without your explicit permission. 
            You can export your data anytime to share with healthcare providers or for your own records.
          </p>
        </div>
      </div>
    </div>
  )
}

function ToolCard({ tool }: { 
  tool: {
    name: string
    description: string 
    href: string
    icon: React.ReactNode
    color: string
    bgColor: string
    status: string
  }
}) {
  const isAvailable = tool.status === "Available Now"
  
  return (
    <div className={`${tool.bgColor} border rounded-2xl p-6 transition-all ${
      isAvailable ? 'hover:shadow-md' : 'opacity-75'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`${tool.color}`}>
          {tool.icon}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isAvailable 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {tool.status}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {tool.name}
      </h3>
      
      <p className="text-gray-700 mb-6 leading-relaxed">
        {tool.description}
      </p>
      
      {isAvailable ? (
        <Link 
          href={tool.href}
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-4 py-2 rounded-lg font-semibold border border-gray-200 transition-colors"
        >
          <PlusCircleIcon className="h-5 w-5" />
          Start Tracking
        </Link>
      ) : (
        <div className="inline-flex items-center gap-2 bg-gray-200 text-gray-600 px-4 py-2 rounded-lg font-semibold cursor-not-allowed">
          Coming Soon
        </div>
      )}
    </div>
  )
}