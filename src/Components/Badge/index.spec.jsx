import React from 'react';
import renderer from 'react-test-renderer';
import { Badge } from '.';
import BadgeContext from '../../contexts/Badge';

const badgesets = {
  subscriber: {
    versions: {
      '1': {
        click_action: 'click_action:subscriber',
        click_url: 'click_url:subscriber',
        description: 'desc:subscriber',
        title: 'title:subscriber',
        image_url_1x: 'subscriber_1_1.jpg',
        image_url_2x: 'subscriber_1_2.jpg',
        image_url_4x: 'subscriber_1_4.jpg',
      },
      '2': {
        click_action: 'click_action:subscriber',
        click_url: 'click_url:subscriber',
        description: 'desc:subscriber',
        title: 'title:subscriber',
        image_url_1x: 'subscriber_2_1.jpg',
        image_url_2x: 'subscriber_2_2.jpg',
        image_url_4x: 'subscriber_2_4.jpg',
      },
    },
  },
  test: {
    versions: {
      '1': {
        click_action: 'click_action:test',
        click_url: 'click_url:test',
        description: 'desc:test',
        title: 'title:test',
        image_url_1x: 'test_1_1.jpg',
        image_url_2x: 'test_1_2.jpg',
        image_url_4x: 'test_1_4.jpg',
      },
      '2': {
        click_action: 'click_action:test',
        click_url: 'click_url:test',
        description: 'desc:test',
        title: 'title:test',
        image_url_1x: 'test_2_1.jpg',
        image_url_2x: 'test_2_2.jpg',
        image_url_4x: 'test_2_4.jpg',
      },
    },
  },
};

describe('Badge', () => {

  test('empty context', () => {
    const comp = renderer.create(<Badge badgeId='test' version='1' />);
    expect(comp.toJSON()).toBe(null);
  });

  test('subs 1', () => {
    const comp = renderer.create(
      <BadgeContext.Provider value={badgesets}>
        <Badge badgeId='subscriber' version='1' />
      </BadgeContext.Provider>
    );
    expect(comp.toJSON()).not.toBeNull();
    expect(comp.toJSON()).toMatchSnapshot();
  });
  test('subs 2', () => {
    const comp = renderer.create(
      <BadgeContext.Provider value={badgesets}>
        <Badge badgeId='subscriber' version='2' />
      </BadgeContext.Provider>
    );
    expect(comp.toJSON()).not.toBeNull();
    expect(comp.toJSON()).toMatchSnapshot();
  });
  test('subs invalid-version', () => {
    const comp = renderer.create(
      <BadgeContext.Provider value={badgesets}>
        <Badge badgeId='subscriber' version='invalid' />
      </BadgeContext.Provider>
    );
    expect(comp.toJSON()).toBeNull();
    expect(comp.toJSON()).toMatchSnapshot();
  });
  test('invalid 1', () => {
    const comp = renderer.create(
      <BadgeContext.Provider value={badgesets}>
        <Badge badgeId='invalid' version='1' />
      </BadgeContext.Provider>
    );
    expect(comp.toJSON()).toBeNull();
    expect(comp.toJSON()).toMatchSnapshot();
  });
})