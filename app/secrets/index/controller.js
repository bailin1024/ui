import { alias } from '@ember/object/computed';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller, { inject as controller } from '@ember/controller';

//const NONE = 'none';
const NAMESPACE = 'namespace';

export default Controller.extend({
  projectController: controller('authenticated.project'),

  sortBy: 'name',
  prefs: service(),
  scope: service(),

  queryParams: ['sortBy'],
  group: alias('projectController.group'),
  groupTableBy: alias('projectController.groupTableBy'),

  headers: [
    {
      name: 'state',
      sort: ['sortState','name','id'],
      type: 'string',
      searchField: 'displayState',
      translationKey: 'generic.state',
      width: 125,
    },
    {
      displayName: 'Name',
      name: 'name',
      sort: ['name','id'],
      translationKey: 'generic.name',
    },
    {
      name: 'description',
      translationKey: 'generic.description',
      sort: ['description','name','id'],
    },
    {
      name: 'namespace',
      translationKey: 'generic.namespace',
      searchField: 'namespace.displayName',
      sort: ['namespace.displayName','name','id'],
    },
    {
      name: 'keys',
      translationKey: 'secretsPage.table.keys',
      searchField: 'keys',
      sort: ['firstKey','name','id'],
    },
    {
      name: 'created',
      translationKey: 'generic.created',
      sort: ['created:desc','name','id'],
      searchField: false,
      type: 'string',
      width: 150,
    },
  ],

  rows: function() {
    const proj = get(this, 'model.projectSecrets').filterBy('type','secret');
    const ns = get(this, 'model.namespacedSecrets').filterBy('type','namespacedSecret');
    const out = proj.concat(ns);
    return out;
  }.property('model.projectSecrets.[].type','model.namespacedSecrets.[].type'),
});
