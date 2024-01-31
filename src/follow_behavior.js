class FollowBehavior {
  constructor() {
    this.target = null;
  }
  setTarget(target) {
    this.target = target;
  }
  update() {
    if (this.target) {
      console.log('Following ' + this.target);
    }
  }
}