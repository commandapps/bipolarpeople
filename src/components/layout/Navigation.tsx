'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, HeartIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import UserMenu from '@/components/auth/UserMenu'

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Stories', 
    href: '/stories',
    hasDropdown: true,
    subcategories: [
      { name: 'All Stories', href: '/stories' },
      { name: 'Personal Journeys', href: '/stories/categories/personal-journeys' },
      { name: 'Managing Episodes', href: '/stories/categories/managing-episodes' },
      { name: 'Cognitive Challenges', href: '/stories/categories/cognitive-challenges' },
      { name: 'Relationship Stories', href: '/stories/categories/relationship-stories' },
      { name: 'Recovery & Hope', href: '/stories/categories/recovery-hope' },
      { name: 'Family/Caregiver Stories', href: '/stories/categories/family-caregiver' },
      { name: 'Share Your Story', href: '/stories/share' }
    ]
  },
  { name: 'Resources', href: '/resources' },
  { name: 'Tools', href: '/tools' },
  { name: 'Community', href: '/community' },
]

export default function Navigation() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  return (
    <Disclosure as="nav" className="bg-white shadow-sm sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-2">
                  <HeartIcon className="h-8 w-8 text-blue-600" />
                  <span className="font-bold text-xl text-gray-900">
                    Bipolar People
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  item.hasDropdown ? (
                    <Menu key={item.name} as="div" className="relative">
                      <Menu.Button className={clsx(
                        'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
                        pathname.startsWith(item.href)
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-700 hover:text-blue-600'
                      )}>
                        {item.name}
                        <ChevronDownIcon className="h-4 w-4" />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {item.subcategories?.map((subcategory) => (
                              <Menu.Item key={subcategory.name}>
                                {({ active }) => (
                                  <Link
                                    href={subcategory.href}
                                    className={clsx(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700 hover:text-blue-600'
                                    )}
                                  >
                                    {subcategory.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        'px-3 py-2 text-sm font-medium transition-colors',
                        pathname === item.href
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-700 hover:text-blue-600'
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <div className="flex items-center gap-4 ml-6">
                  {status === 'loading' ? (
                    <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse"></div>
                  ) : session ? (
                    <UserMenu user={session.user} />
                  ) : (
                    <Link
                      href="/login"
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    >
                      Sign In
                    </Link>
                  )}
                  <Link
                    href="/crisis-resources"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Crisis Resources
                  </Link>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                item.hasDropdown ? (
                  <div key={item.name}>
                    <div className={clsx(
                      'block px-3 py-2 text-base font-medium rounded-md',
                      pathname.startsWith(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700'
                    )}>
                      {item.name}
                    </div>
                    <div className="ml-4 space-y-1">
                      {item.subcategories?.map((subcategory) => (
                        <Link
                          key={subcategory.name}
                          href={subcategory.href}
                          className={clsx(
                            'block px-3 py-2 text-sm font-medium rounded-md transition-colors',
                            pathname === subcategory.href
                              ? 'text-blue-600 bg-blue-50'
                              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                          )}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      'block px-3 py-2 text-base font-medium rounded-md transition-colors',
                      pathname === item.href
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    )}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <div className="mt-4 space-y-2">
                {status === 'loading' ? (
                  <div className="px-3 py-2 text-base font-medium rounded-md bg-gray-100 animate-pulse">
                    Loading...
                  </div>
                ) : session ? (
                  <div className="px-3 py-2 text-base font-medium rounded-md bg-blue-50 text-blue-700">
                    Welcome, {session.user?.name || 'User'}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                  >
                    Sign In
                  </Link>
                )}
                <Link
                  href="/crisis-resources"
                  className="block px-3 py-2 text-base font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Crisis Resources
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}