export class UserMother {
  static empty() {
    return {
      id: 0,
      name: '',
      balance: 0,
    }
  }

  static random() {
    return {
      id: Math.floor(Math.random() * 5000) + 1,
      name: 'User Name',
      balance: Math.floor(Math.random() * 5000) + 1,
    }
  }

  static valid() {
    return {
      id: 1,
      name: 'User Name',
      balance: 100,
    }
  }

  static validWithId(id: number) {
    return {
      id,
      name: 'User Name',
      balance: 100,
    }
  }

  static validWithIdAndBalance(id: number, balance: number) {
    return {
      id,
      name: 'User Name',
      balance,
    }
  }

  static withInvalidId() {
    return {
      id: -1,
      name: 'User Name',
      balance: 100,
    }
  }

  static withInvalidName() {
    return {
      id: 1,
      name: '',
      balance: 100,
    }
  }

  static withInvalidBalance() {
    return {
      id: 1,
      name: 'User Name',
      balance: -100,
    }
  }
}
