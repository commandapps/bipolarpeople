import { PhoneIcon, ChatBubbleLeftRightIcon, ExclamationTriangleIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const immediateHelpResources = [
  {
    name: "988 Suicide & Crisis Lifeline",
    description: "24/7 free and confidential support for people in distress",
    phone: "988",
    website: "https://988lifeline.org",
    available: "24/7",
    languages: "English, Spanish, and 200+ languages via interpretation services"
  },
  {
    name: "Crisis Text Line",
    description: "Text-based crisis support for anyone in crisis",
    phone: "Text HOME to 741741",
    website: "https://crisistextline.org",
    available: "24/7",
    languages: "English and Spanish"
  },
  {
    name: "Emergency Services",
    description: "For immediate life-threatening emergencies",
    phone: "911",
    available: "24/7",
    languages: "Varies by location"
  }
]

const bipolarSpecificResources = [
  {
    name: "Depression and Bipolar Support Alliance (DBSA)",
    description: "Peer support groups and resources specifically for bipolar disorder",
    phone: "(800) 826-3632",
    website: "https://dbsalliance.org",
    available: "Business hours",
    services: ["Support groups", "Online resources", "Wellness tools"]
  },
  {
    name: "International Bipolar Foundation",
    description: "Education and support for bipolar disorder community",
    website: "https://ibpf.org",
    available: "Online resources available 24/7",
    services: ["Educational materials", "Support groups", "Webinars"]
  },
  {
    name: "NAMI (National Alliance on Mental Illness)",
    description: "Mental health support and advocacy",
    phone: "(800) 950-6264",
    website: "https://nami.org",
    available: "Business hours",
    services: ["Support groups", "Education programs", "Helpline"]
  }
]

const warningSignsData = [
  {
    category: "Severe Depression",
    signs: [
      "Thoughts of suicide or self-harm",
      "Feeling hopeless or worthless",
      "Unable to care for yourself",
      "Extreme fatigue or inability to function",
      "Isolation from all support"
    ]
  },
  {
    category: "Severe Mania",
    signs: [
      "Dangerous or reckless behavior",
      "Severe agitation or aggression",
      "Complete loss of judgment",
      "Psychotic symptoms (hallucinations, delusions)",
      "Going days without sleep"
    ]
  },
  {
    category: "Mixed Episodes",
    signs: [
      "High energy with depressed mood",
      "Extreme irritability with suicidal thoughts",
      "Rapid cycling between extremes",
      "Feeling agitated and hopeless simultaneously"
    ]
  }
]

export default function CrisisResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency Alert Header */}
      <div className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <p className="text-lg font-semibold">
              If you are in immediate danger, call 911 or go to your nearest emergency room
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Crisis Resources & Support
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You are not alone. Help is available 24/7. These resources are here for you 
              during difficult times, whether you are in crisis or supporting someone who is.
            </p>
          </div>
        </div>
      </section>

      {/* Immediate Help Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <PhoneIcon className="h-8 w-8 text-red-600" />
              <h2 className="text-3xl font-bold text-red-900">
                Immediate Help - Available 24/7
              </h2>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
              {immediateHelpResources.map((resource) => (
                <CrisisResourceCard key={resource.name} resource={resource} urgent={true} />
              ))}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="tel:988"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-3 justify-center transition-colors"
            >
              <PhoneIcon className="h-6 w-6" />
              Call 988 Crisis Lifeline
            </a>
            <a
              href="sms:741741&body=HOME"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-3 justify-center transition-colors"
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              Text Crisis Line: 741741
            </a>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            When to Seek Crisis Support
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {warningSignsData.map((category) => (
              <WarningSignsCard key={category.category} category={category} />
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">
                  Trust Your Instincts
                </h3>
                <p className="text-yellow-700">
                  If you or someone you know is showing any combination of these signs, 
                  do not wait. Crisis support is available immediately, and early intervention 
                  can prevent a situation from becoming more dangerous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bipolar-Specific Resources */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Bipolar-Specific Support Resources
          </h2>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {bipolarSpecificResources.map((resource) => (
              <CrisisResourceCard key={resource.name} resource={resource} urgent={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Supporting Someone Else */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <HeartIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Supporting Someone in Crisis
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              If someone you care about is in crisis, your support can make a life-saving difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <SupportTipsCard
              title="What TO Do"
              tips={[
                "Listen without judgment",
                "Take all threats of self-harm seriously",
                "Stay calm and reassuring",
                "Help them contact crisis resources",
                "Remove means of self-harm if possible",
                "Stay with them or ensure someone else can",
                "Follow up regularly"
              ]}
              positive={true}
            />
            <SupportTipsCard
              title="What NOT to Do"
              tips={[
                "Don't leave them alone if actively suicidal",
                "Don't promise to keep suicidal plans secret",
                "Don't argue about whether life is worth living",
                "Don't act shocked or judgmental",
                "Don't try to solve all their problems",
                "Don't take responsibility for their recovery",
                "Don't neglect your own self-care"
              ]}
              positive={false}
            />
          </div>
        </div>
      </section>

      {/* Safety Planning */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Create Your Safety Plan
          </h2>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-8">
            <p className="text-lg text-green-800 mb-6">
              A safety plan is a personalized, practical plan to help you stay safe when you are having thoughts of suicide.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-900 mb-3">Include in Your Safety Plan:</h3>
                <ul className="space-y-2 text-green-800">
                  <li>• Warning signs that crisis may be approaching</li>
                  <li>• Coping strategies that work for you</li>
                  <li>• People and social settings that provide distraction</li>
                  <li>• Family members or friends who may help resolve a crisis</li>
                  <li>• Mental health professionals you can contact</li>
                  <li>• How to make your environment safe</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-green-900 mb-3">Safety Planning Resources:</h3>
                <div className="space-y-3">
                  <a 
                    href="https://suicidesafetyplan.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-green-100 hover:bg-green-200 p-3 rounded-lg transition-colors"
                  >
                    <div className="font-semibold">Safety Planning App</div>
                    <div className="text-sm text-green-700">Free app to create and store your safety plan</div>
                  </a>
                  <a 
                    href="https://988lifeline.org/help-yourself/safety-planning/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-green-100 hover:bg-green-200 p-3 rounded-lg transition-colors"
                  >
                    <div className="font-semibold">988 Lifeline Safety Planning</div>
                    <div className="text-sm text-green-700">Detailed guide to creating your plan</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Encouragement */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Your Life Has Value
          </h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Crisis is temporary. Recovery is possible. You deserve support, and help is always available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:988"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Call 988 Now
            </a>
            <Link href="/" className="border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-colors">Return to Community</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function CrisisResourceCard({ resource, urgent }: { resource: { name: string; description: string; phone?: string; website?: string; available: string; languages?: string; services?: string[] }, urgent: boolean }) {
  const cardClass = urgent 
    ? "bg-white border-2 border-red-200 hover:border-red-300" 
    : "bg-white border border-gray-200 hover:border-gray-300"

  return (
    <div className={`${cardClass} rounded-xl p-6 transition-all hover:shadow-md`}>
      <h3 className={`text-lg font-bold mb-2 ${urgent ? 'text-red-900' : 'text-gray-900'}`}>
        {resource.name}
      </h3>
      <p className="text-gray-600 mb-4 text-sm">
        {resource.description}
      </p>
      
      <div className="space-y-2 text-sm">
        {resource.phone && (
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-4 w-4 text-gray-500" />
            <a 
              href={`tel:${resource.phone.replace(/\D/g, '')}`}
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              {resource.phone}
            </a>
          </div>
        )}
        
        {resource.website && (
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 text-gray-500">🌐</span>
            <a 
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 break-all"
            >
              Visit Website
            </a>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 text-gray-500" />
          <span className="text-gray-700">{resource.available}</span>
        </div>
        
        {resource.languages && (
          <div className="text-gray-600">
            <strong>Languages:</strong> {resource.languages}
          </div>
        )}
        
        {resource.services && (
          <div className="mt-3">
            <strong className="text-gray-700">Services:</strong>
            <ul className="list-disc list-inside text-gray-600 mt-1">
              {resource.services.map((service: string) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function WarningSignsCard({ category }: { category: { category: string; signs: string[] } }) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-yellow-900 mb-4">
        {category.category}
      </h3>
      <ul className="space-y-2">
        {category.signs.map((sign: string) => (
          <li key={sign} className="flex items-start gap-2 text-yellow-800">
            <span className="text-yellow-600 mt-1">•</span>
            <span className="text-sm">{sign}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SupportTipsCard({ title, tips, positive }: { 
  title: string, 
  tips: string[], 
  positive: boolean 
}) {
  const bgColor = positive ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
  const textColor = positive ? 'text-green-900' : 'text-red-900'
  const listColor = positive ? 'text-green-800' : 'text-red-800'
  
  return (
    <div className={`${bgColor} border rounded-lg p-6`}>
      <h3 className={`text-lg font-bold ${textColor} mb-4`}>
        {title}
      </h3>
      <ul className="space-y-2">
        {tips.map((tip) => (
          <li key={tip} className={`flex items-start gap-2 ${listColor}`}>
            <span className="mt-1">{positive ? '✓' : '✗'}</span>
            <span className="text-sm">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}