"use strict";

tutao.provide('tutao.entity.tutanota.FileData');

/**
 * @constructor
 * @param {Object=} data The json data to store in this entity.
 */
tutao.entity.tutanota.FileData = function(data) {
  if (data) {
    this.updateData(data);
  } else {
    this.__format = "0";
    this.__id = null;
    this.__ownerGroup = null;
    this.__permissions = null;
    this._size = null;
    this._unreferenced = null;
    this._blocks = [];
  }
  this._entityHelper = new tutao.entity.EntityHelper(this);
  this.prototype = tutao.entity.tutanota.FileData.prototype;
};

/**
 * Updates the data of this entity.
 * @param {Object=} data The json data to store in this entity.
 */
tutao.entity.tutanota.FileData.prototype.updateData = function(data) {
  this.__format = data._format;
  this.__id = data._id;
  this.__ownerGroup = data._ownerGroup;
  this.__permissions = data._permissions;
  this._size = data.size;
  this._unreferenced = data.unreferenced;
  this._blocks = [];
  for (var i=0; i < data.blocks.length; i++) {
    this._blocks.push(new tutao.entity.tutanota.DataBlock(this, data.blocks[i]));
  }
};

/**
 * The version of the model this type belongs to.
 * @const
 */
tutao.entity.tutanota.FileData.MODEL_VERSION = '25';

/**
 * The url path to the resource.
 * @const
 */
tutao.entity.tutanota.FileData.PATH = '/rest/tutanota/filedata';

/**
 * The id of the root instance reference.
 * @const
 */
tutao.entity.tutanota.FileData.ROOT_INSTANCE_ID = 'CHR1dGFub3RhAAQ';

/**
 * The generated id type flag.
 * @const
 */
tutao.entity.tutanota.FileData.GENERATED_ID = true;

/**
 * The encrypted flag.
 * @const
 */
tutao.entity.tutanota.FileData.prototype.ENCRYPTED = false;

/**
 * Provides the data of this instances as an object that can be converted to json.
 * @return {Object} The json object.
 */
tutao.entity.tutanota.FileData.prototype.toJsonData = function() {
  return {
    _format: this.__format, 
    _id: this.__id, 
    _ownerGroup: this.__ownerGroup, 
    _permissions: this.__permissions, 
    size: this._size, 
    unreferenced: this._unreferenced, 
    blocks: tutao.entity.EntityHelper.aggregatesToJsonData(this._blocks)
  };
};

/**
 * Provides the id of this FileData.
 * @return {string} The id of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.getId = function() {
  return this.__id;
};

/**
 * Sets the format of this FileData.
 * @param {string} format The format of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.setFormat = function(format) {
  this.__format = format;
  return this;
};

/**
 * Provides the format of this FileData.
 * @return {string} The format of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.getFormat = function() {
  return this.__format;
};

/**
 * Sets the ownerGroup of this FileData.
 * @param {string} ownerGroup The ownerGroup of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.setOwnerGroup = function(ownerGroup) {
  this.__ownerGroup = ownerGroup;
  return this;
};

/**
 * Provides the ownerGroup of this FileData.
 * @return {string} The ownerGroup of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.getOwnerGroup = function() {
  return this.__ownerGroup;
};

/**
 * Sets the permissions of this FileData.
 * @param {string} permissions The permissions of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.setPermissions = function(permissions) {
  this.__permissions = permissions;
  return this;
};

/**
 * Provides the permissions of this FileData.
 * @return {string} The permissions of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.getPermissions = function() {
  return this.__permissions;
};

/**
 * Sets the size of this FileData.
 * @param {string} size The size of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.setSize = function(size) {
  this._size = size;
  return this;
};

/**
 * Provides the size of this FileData.
 * @return {string} The size of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.getSize = function() {
  return this._size;
};

/**
 * Sets the unreferenced of this FileData.
 * @param {boolean} unreferenced The unreferenced of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.setUnreferenced = function(unreferenced) {
  this._unreferenced = unreferenced ? '1' : '0';
  return this;
};

/**
 * Provides the unreferenced of this FileData.
 * @return {boolean} The unreferenced of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.getUnreferenced = function() {
  return this._unreferenced != '0';
};

/**
 * Provides the blocks of this FileData.
 * @return {Array.<tutao.entity.tutanota.DataBlock>} The blocks of this FileData.
 */
tutao.entity.tutanota.FileData.prototype.getBlocks = function() {
  return this._blocks;
};

/**
 * Loads a FileData from the server.
 * @param {string} id The id of the FileData.
 * @return {Promise.<tutao.entity.tutanota.FileData>} Resolves to the FileData or an exception if the loading failed.
 */
tutao.entity.tutanota.FileData.load = function(id) {
  return tutao.locator.entityRestClient.getElement(tutao.entity.tutanota.FileData, tutao.entity.tutanota.FileData.PATH, id, null, {"v" : "25"}, tutao.entity.EntityHelper.createAuthHeaders()).then(function(entity) {
    return entity;
  });
};

/**
 * Loads multiple FileDatas from the server.
 * @param {Array.<string>} ids The ids of the FileDatas to load.
 * @return {Promise.<Array.<tutao.entity.tutanota.FileData>>} Resolves to an array of FileData or rejects with an exception if the loading failed.
 */
tutao.entity.tutanota.FileData.loadMultiple = function(ids) {
  return tutao.locator.entityRestClient.getElements(tutao.entity.tutanota.FileData, tutao.entity.tutanota.FileData.PATH, ids, {"v": "25"}, tutao.entity.EntityHelper.createAuthHeaders()).then(function(entities) {
    return entities;
  });
};

/**
 * Updates this FileData on the server.
 * @return {Promise.<>} Resolves when finished, rejected if the update failed.
 */
tutao.entity.tutanota.FileData.prototype.update = function() {
  var self = this;
  return tutao.locator.entityRestClient.putElement(tutao.entity.tutanota.FileData.PATH, this, {"v": "25"}, tutao.entity.EntityHelper.createAuthHeaders()).then(function() {
    self._entityHelper.notifyObservers(false);
  });
};

/**
 * Register a function that is called as soon as any attribute of the entity has changed. If this listener
 * was already registered it is not registered again.
 * @param {function(Object,*=)} listener. The listener function. When called it gets the entity and the given id as arguments.
 * @param {*=} id. An optional value that is just passed-through to the listener.
 */
tutao.entity.tutanota.FileData.prototype.registerObserver = function(listener, id) {
  this._entityHelper.registerObserver(listener, id);
};

/**
 * Removes a registered listener function if it was registered before.
 * @param {function(Object)} listener. The listener to unregister.
 */
tutao.entity.tutanota.FileData.prototype.unregisterObserver = function(listener) {
  this._entityHelper.unregisterObserver(listener);
};
/**
 * Provides the entity helper of this entity.
 * @return {tutao.entity.EntityHelper} The entity helper.
 */
tutao.entity.tutanota.FileData.prototype.getEntityHelper = function() {
  return this._entityHelper;
};
