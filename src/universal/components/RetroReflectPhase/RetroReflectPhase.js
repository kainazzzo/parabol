/**
 * Renders the UI for the reflection phase of the retrospective meeting
 *
 * @flow
 */
import type {Team} from 'universal/types/schema.flow';

import React from 'react';
import styled from 'react-emotion';
import {createFragmentContainer} from 'react-relay';

import ReflectionPhaseColumn from './ReflectionPhaseColumn';

type Props = {
  team: Team,
};

const ReflectPhaseWrapper = styled('div')({
  height: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%'
});

const RetroReflectPhase = ({team}: Props) => {
  const {newMeeting, meetingSettings} = team;
  if (!meetingSettings.hasOwnProperty('phaseItems')) {
    return null;
  }
  // The nested union types of meetingSettings/phaseItems are creating a multiplicative
  // effect on the possible values of meetingSettings, making it really difficult
  // $FlowFixMe
  const {phaseItems} = meetingSettings;
  return (
    <ReflectPhaseWrapper>
      {phaseItems && phaseItems.map((phaseItem) =>
        <ReflectionPhaseColumn newMeeting={newMeeting} key={phaseItem.id} retroPhaseItem={phaseItem} team={team} />
      )}
    </ReflectPhaseWrapper>
  );
};

export default createFragmentContainer(
  RetroReflectPhase,
  graphql`
    fragment RetroReflectPhase_team on Team {
      ...ReflectionPhaseColumn_team
      meetingSettings(meetingType: $meetingType) {
        ... on RetrospectiveMeetingSettings {
          phaseItems {
            ... on RetroPhaseItem {
              id
              ...ReflectionPhaseColumn_retroPhaseItem
            }
          }
        }
      }
    }
  `
);