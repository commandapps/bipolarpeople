'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import { UserIcon, ChevronDownIcon, ArrowRightOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import clsx from 'clsx'

interface UserMenuProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function UserMenu({ user }: UserMenuProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || 'User'}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span className="text-blue-600 font-semibold text-sm">
              {getInitials(user.name)}
            </span>
          )}
        </div>
        <span className="hidden md:block">{user.name || 'User'}</span>
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/profile"
                  className={clsx(
                    active ? 'bg-gray-100' : '',
                    'flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-blue-600'
                  )}
                >
                  <UserIcon className="h-4 w-4" />
                  My Profile
                </Link>
              )}
            </Menu.Item>
            
            <Menu.Item>
              {({ active }) => (
                <a
                  href={`${process.env.NEXT_PUBLIC_DISCOURSE_URL || 'https://bipolarpeople.discourse.group'}/session/sso`}
                  className={clsx(
                    active ? 'bg-gray-100' : '',
                    'flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-blue-600'
                  )}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Community Forum
                </a>
              )}
            </Menu.Item>

            <div className="border-t border-gray-100 my-1"></div>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={clsx(
                    active ? 'bg-gray-100' : '',
                    'flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:text-red-600 w-full text-left'
                  )}
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
