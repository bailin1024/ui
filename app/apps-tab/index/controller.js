import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';
import C from 'ui/utils/constants';
import { computed, get } from '@ember/object';

export default Controller.extend({
  projectController: controller('authenticated.project'),
  prefs:             service(),
  intl:              service(),
  tags:              alias('projectController.tags'),
  sortBy:            'name',
  expandedApps:    null,

  init() {
    this._super(...arguments);
    this.set('expandedApps',[]);
  },

  actions: {
    toggleExpand(instId) {
      let list = get(this,'expandedApps');
      if ( list.includes(instId) ) {
        list.removeObject(instId);
      } else {
        list.addObject(instId);
      }
    },
  },

  filteredApps: computed('model.apps.@each.{type,isFromCatalog,tags,state}','tags', function() {
    var needTags = get(this,'tags');

    var out = get(this,'model.apps').filter((ns) => {
      return !C.REMOVEDISH_STATES.includes(get(ns,'state'));
    });

    if ( needTags.length ) {
      out = out.filter((obj) => obj.hasTags(needTags));
    }

    return out;
  }),
});
