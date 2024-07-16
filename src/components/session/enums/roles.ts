const roles = Object.freeze({
    ADMIN: 'ad',
    NATIONAL_COORDINATOR: 'cn',
    ANALYST: 'an',
    POLLSTER: 'po',
    COORDINATOR: 'co',
    SUB_COORDINATOR: 'sc',
    SUPERVISOR: 'su',
    ENTRY: 'en',
    COMPUTER_ASSISTANT: 'ca',
    TEAM_LEADER: 'tl',
} as const);
   
  type Roles = typeof roles[keyof typeof roles];
   
export const ALL = Object.freeze(Object.values(roles)) as readonly Roles[];
export const ONLY_HEAD = Object.freeze([
    roles.ADMIN,
    roles.NATIONAL_COORDINATOR,
]) as readonly Roles[];
export const TABLET_USERS = Object.freeze([
    roles.SUPERVISOR,
    roles.POLLSTER,
    roles.ADMIN,
]) as readonly Roles[];
  
  
export default roles;
