import {NewMeetingPhaseTypeEnum} from '../../types/graphql'
import {ACTION, RETROSPECTIVE} from '../constants'

/* Used by the server! cannot convert to enums yet */

/* These are the labels show to the viewer */
export const phaseLabelLookup = {
  [NewMeetingPhaseTypeEnum.checkin]: 'Social Check-in',
  [NewMeetingPhaseTypeEnum.reflect]: 'Reflect',
  [NewMeetingPhaseTypeEnum.group]: 'Group',
  [NewMeetingPhaseTypeEnum.vote]: 'Vote',
  [NewMeetingPhaseTypeEnum.discuss]: 'Discuss',
  [NewMeetingPhaseTypeEnum.updates]: 'Solo Updates',
  [NewMeetingPhaseTypeEnum.firstcall]: 'First Call',
  [NewMeetingPhaseTypeEnum.agendaitems]: 'Team Agenda',
  [NewMeetingPhaseTypeEnum.lastcall]: 'Last Call',
  [NewMeetingPhaseTypeEnum.SUMMARY]: 'Summary'
}

export const phaseIconLookup = {
  [NewMeetingPhaseTypeEnum.checkin]: 'group',
  [NewMeetingPhaseTypeEnum.reflect]: 'edit',
  [NewMeetingPhaseTypeEnum.group]: 'group_work',
  [NewMeetingPhaseTypeEnum.vote]: 'thumbs_up_down',
  [NewMeetingPhaseTypeEnum.discuss]: 'comment',
  [NewMeetingPhaseTypeEnum.updates]: 'update',
  [NewMeetingPhaseTypeEnum.firstcall]: 'comment',
  [NewMeetingPhaseTypeEnum.agendaitems]: 'comment',
  [NewMeetingPhaseTypeEnum.lastcall]: 'comment',
  [NewMeetingPhaseTypeEnum.SUMMARY]: 'receipt'
}

export const meetingTypeToIcon = {
  [RETROSPECTIVE]: 'history',
  [ACTION]: 'change_history'
} as const

export const phaseTypeToSlug = {
  [NewMeetingPhaseTypeEnum.checkin]: 'checkin',
  [NewMeetingPhaseTypeEnum.reflect]: 'reflect',
  [NewMeetingPhaseTypeEnum.group]: 'group',
  [NewMeetingPhaseTypeEnum.vote]: 'vote',
  [NewMeetingPhaseTypeEnum.discuss]: 'discuss',
  [NewMeetingPhaseTypeEnum.updates]: 'updates',
  [NewMeetingPhaseTypeEnum.firstcall]: 'firstcall',
  [NewMeetingPhaseTypeEnum.agendaitems]: 'agendaitems',
  [NewMeetingPhaseTypeEnum.lastcall]: 'lastcall',
  [NewMeetingPhaseTypeEnum.SUMMARY]: 'summary'
}
