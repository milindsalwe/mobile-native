import React, {
  Component
} from 'react';

import {
  Text,
  Image,
  View,
  ActivityIndicator,
  Button,
  StyleSheet
} from 'react-native';

import {
  observer,
  inject
} from 'mobx-react/native'

import Icon from 'react-native-vector-icons/Ionicons';
import channelService from './ChannelService';
import { MINDS_URI } from '../config/Config';
import ActionSheet from 'react-native-actionsheet';

/**
 * Channel Actions
 */
const title = 'Actions';
@observer
export default class ChannelActions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selected: '',
    }

    this.handleSelection = this.handleSelection.bind(this);
  }

  showActionSheet() {
    this.ActionSheet.show();
  }

  handleSelection(i) {
    this.makeAction(i);
  }

  getOptions() {
    let options = [ 'Cancel' ];

    if(this.props.channel.channel.subscribed){
      options.push( 'Unsubscribe' );
    }

    if (!this.props.channel.channel.blocked) {
      options.push( 'Block' );
    } else {
      options.push( 'Un-Block' );
    }

    options.push( 'Report' );

    return options;

  }

  makeAction(option) {
    let options = this.getOptions();
    let selected = options[option];
    switch (selected) {
      case 'Unsubscribe':
        this.props.channel.subscribe();
        break;
      case 'Block':
        this.props.channel.toggleBlock();
        break;
      case 'Un-Block':
        this.props.channel.toggleBlock();
        break;
      case 'Report':
        this.props.navigation.navigate('Report', { entity: this.props.channel.channel });
        break;
    }

    
  }
  
  /**
   * Render Header
   */
  render() {

    const channel = this.props.channel.channel;

    return (
      <View>
        <Icon name="md-settings" style={ styles.icon } onPress={() => this.showActionSheet()} size={20} />
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={title}
          options={this.getOptions()}
          onPress={this.handleSelection}
          cancelButtonIndex={0}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
	wrapper: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  icon: {
    color: '#444',
  },
});
