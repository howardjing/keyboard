const isSyncing = (state): boolean => (
  state.getIn(['tipJar', 'syncing'])
);

export {
  isSyncing,
};
