import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import AuthGuard from '../../components/AuthGuard'
import { SignOutButton } from '../../components/SignOutButton'

export default function Page() {
  const { user } = useUser()

  return (
    <AuthGuard>
      <View>
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
          <SignOutButton />
        </SignedIn>
        <SignedOut>
          <Link href="/(auth)/login">
            <Text>Sign in</Text>
          </Link>
          <Link href="/(auth)/signup">
            <Text>Sign up</Text>
          </Link>
        </SignedOut>
      </View>
    </AuthGuard>
  )
}