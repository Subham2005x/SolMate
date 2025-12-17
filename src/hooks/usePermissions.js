import { useState, useEffect, useMemo } from 'react'

/**
 * Custom hook for role-based permission management in Solmate
 * Implements the permission matrix from GROUP_COMMUNITY_SYSTEM.md
 * 
 * @param {string} tripId - The trip identifier
 * @param {string} userId - The current user identifier
 * @param {object} tripData - Full trip data including members
 * @returns {object} Permission flags and helper functions
 */
export const usePermissions = (tripId, userId, tripData) => {
  const [currentMember, setCurrentMember] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!tripData || !userId) {
      setIsLoading(false)
      return
    }

    // Find current user in trip members
    const member = tripData.members?.find(m => m.userId === userId || m.id === userId)
    setCurrentMember(member)
    setIsLoading(false)
  }, [tripId, userId, tripData])

  // Compute all permissions based on role
  const permissions = useMemo(() => {
    if (!currentMember) {
      return {
        // No membership - all false
        isCreator: false,
        isAdmin: false,
        isMember: false,
        hasAccess: false,
        
        // Trip Management
        canViewTrip: false,
        canEditTripDetails: false,
        canDeleteTrip: false,
        canArchiveTrip: false,
        
        // Member Management
        canViewMembers: false,
        canAddMembers: false,
        canRemoveMembers: false,
        canPromoteToAdmin: false,
        canDemoteAdmin: false,
        canLeaveGroup: false,
        
        // Content & Planning
        canViewItinerary: false,
        canEditItinerary: false,
        canViewBudget: false,
        canAddExpenses: false,
        canEditOthersExpenses: false,
        
        // Communication
        canSendMessages: false,
        canDeleteOwnMessages: false,
        canDeleteAnyMessage: false,
        canPinMessages: false,
        
        // Polls & Decisions
        canCreatePoll: false,
        canVoteOnPoll: false,
        canClosePoll: false,
        canDeletePoll: false,
        
        // Community
        canAccessCommunity: false,
        canViewTravelers: false,
        canSendConnectionRequests: false,
        canBlockUsers: false,
      }
    }

    const isCreator = currentMember.isCreator === true
    const isAdmin = currentMember.role === 'admin'
    const isMember = currentMember.role === 'member'
    const isSoloTrip = tripData.type === 'solo'
    const isGroupTrip = tripData.type === 'group'

    return {
      // Role Identifiers
      isCreator,
      isAdmin,
      isMember,
      hasAccess: true,
      
      // Trip Management
      canViewTrip: true,
      canEditTripDetails: isCreator || isAdmin || isSoloTrip,
      canDeleteTrip: isCreator,
      canArchiveTrip: isCreator || isAdmin || isSoloTrip,
      
      // Member Management
      canViewMembers: isGroupTrip,
      canAddMembers: (isCreator || isAdmin) && isGroupTrip,
      canRemoveMembers: (isCreator || isAdmin) && isGroupTrip,
      canPromoteToAdmin: (isCreator || isAdmin) && isGroupTrip,
      canDemoteAdmin: (isCreator || isAdmin) && isGroupTrip,
      canLeaveGroup: (isAdmin || isMember) && isGroupTrip && !isCreator,
      
      // Content & Planning
      canViewItinerary: true,
      canEditItinerary: true, // All members can edit, with optional approval
      canViewBudget: true,
      canAddExpenses: true,
      canEditOthersExpenses: isCreator || isAdmin || isSoloTrip,
      
      // Communication (Group trips only)
      canSendMessages: isGroupTrip,
      canDeleteOwnMessages: isGroupTrip,
      canDeleteAnyMessage: (isCreator || isAdmin) && isGroupTrip,
      canPinMessages: (isCreator || isAdmin) && isGroupTrip,
      
      // Polls & Decisions (Group trips only)
      canCreatePoll: (isCreator || isAdmin) && isGroupTrip,
      canVoteOnPoll: isGroupTrip,
      canClosePoll: (isCreator || isAdmin) && isGroupTrip,
      canDeletePoll: (isCreator || isAdmin) && isGroupTrip,
      
      // Community (Solo trips only)
      canAccessCommunity: isSoloTrip,
      canViewTravelers: isSoloTrip,
      canSendConnectionRequests: isSoloTrip,
      canBlockUsers: isSoloTrip,
    }
  }, [currentMember, tripData])

  // Helper functions
  const canPerformAction = (action) => {
    return permissions[action] === true
  }

  const canManageMember = (targetMember) => {
    if (!permissions.canRemoveMembers) return false
    if (targetMember.isCreator) return false // Cannot remove creator
    if (targetMember.id === userId) return false // Cannot remove self
    return true
  }

  const canChangeMemberRole = (targetMember, newRole) => {
    if (!currentMember) return false
    
    // Creator can do anything
    if (permissions.isCreator) {
      if (newRole === 'admin') return permissions.canPromoteToAdmin
      if (newRole === 'member') return permissions.canDemoteAdmin && !targetMember.isCreator
    }
    
    // Admin can promote/demote but not the creator
    if (permissions.isAdmin) {
      if (targetMember.isCreator) return false
      if (newRole === 'admin') return permissions.canPromoteToAdmin
      if (newRole === 'member') return permissions.canDemoteAdmin
    }
    
    return false
  }

  const getRoleBadge = (role, isCreator) => {
    if (isCreator) {
      return { text: 'CREATOR', color: '#FFD700', icon: '👑' }
    }
    switch (role) {
      case 'admin':
        return { text: 'ADMIN', color: '#E76F51', icon: '⚡' }
      case 'member':
        return { text: 'MEMBER', color: '#10B981', icon: '👤' }
      default:
        return { text: 'GUEST', color: '#6B7280', icon: '👁️' }
    }
  }

  return {
    ...permissions,
    currentMember,
    isLoading,
    canPerformAction,
    canManageMember,
    canChangeMemberRole,
    getRoleBadge,
  }
}

/**
 * Hook for checking if user can convert solo trip to group
 */
export const useConversionPermissions = (tripData, userId) => {
  const canConvertToGroup = useMemo(() => {
    if (!tripData || !userId) return false
    if (tripData.type !== 'solo') return false
    if (tripData.userId !== userId && tripData.creatorId !== userId) return false
    return true
  }, [tripData, userId])

  const canConvertToSolo = useMemo(() => {
    if (!tripData || !userId) return false
    if (tripData.type !== 'group') return false
    
    const member = tripData.members?.find(m => m.userId === userId || m.id === userId)
    if (!member?.isCreator) return false
    
    // Must have only one member (the creator)
    const memberCount = tripData.members?.filter(m => m.status !== 'removed').length || 0
    return memberCount === 1
  }, [tripData, userId])

  return {
    canConvertToGroup,
    canConvertToSolo,
  }
}

export default usePermissions
