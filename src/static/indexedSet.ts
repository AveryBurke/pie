/** constant time insert, lookup and delete */
export default class IndexedSet {
  membersByIndex: { [member: string]: number } = {};
  members: string[] = [];

  /**
   * @param {string} member member to add
   * @return {boolean} indicates if the member was already in the set
   */
  insert(member: string): boolean {
    const has = member in this.membersByIndex;
    if (!has) {
      this.membersByIndex[member] = this.members.length;
      this.members.push(member);
    }
    return !has;
  }

  /**
   * @param {string} member member to remove
   * @return {boolean} indicates if the member was not in the set
   */
  remove(member: string): boolean {
    const had = member in this.membersByIndex;
    if (had) {
      const indexToRemove = this.membersByIndex[member],
        valueToKeep = this.members[this.members.length - 1];
      this.members[indexToRemove] = valueToKeep;
      this.membersByIndex[valueToKeep] = indexToRemove;
      delete this.membersByIndex[member];
      this.members.pop();
    }
    return had;
  }

  /**
   * @param {string} member member to index
   * @return {number} the index of the member or -1 if the member is not in the set
   */
  getIndex(member: string): number {
    /** can't use the less verbose return this.membersByIndex[member] || -1 because index 0 will read as falsy */
    const has = member in this.membersByIndex
    if (has){
        return this.membersByIndex[member]
    }
    return -1;
  }

  /**
   * @param {number} index index of the member
   * @return {string | boolean} the member or flase if the member not in the set
   */
  getMember(index: number): string | boolean{
    const has = index < this.members.length
    if (has){
        return this.members[index]
    }
    return has
  }
}
