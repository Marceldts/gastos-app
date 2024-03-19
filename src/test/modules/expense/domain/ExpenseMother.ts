export class ExpenseMother {
  static empty() {
    return {
      payerId: 0,
      payerName: '',
      amount: 0,
      description: '',
      date: '',
    }
  }

  static random() {
    return {
      payerId: Math.floor(Math.random() * 5000) + 1,
      payerName: 'Payer Name',
      amount: Math.floor(Math.random() * 5000) + 1,
      description: 'Description',
      date: '2021-01-01',
    }
  }

  static valid() {
    return {
      payerId: 1,
      payerName: 'Payer Name',
      amount: 100,
      description: 'Description',
      date: '2021-01-01',
    }
  }

  static validWithPayerId(payerId: number) {
    return {
      payerId,
      payerName: 'Payer Name',
      amount: 100,
      description: 'Description',
      date: '2021-01-01',
    }
  }

  static validWithPayerIdAndAmount(payerId: number, amount: number) {
    return {
      payerId,
      payerName: 'Payer Name',
      amount,
      description: 'Description',
      date: '2021-01-01',
    }
  }

  static validWithPayerName(payerName: string) {
    return {
      payerId: 1,
      payerName,
      amount: 100,
      description: 'Description',
      date: '2021-01-01',
    }
  }

  static validWithAmount(amount: number) {
    return {
      payerId: 1,
      payerName: 'Payer Name',
      amount,
      description: 'Description',
      date: '2021-01-01',
    }
  }

  static validWithDescription(description: string) {
    return {
      payerId: 1,
      payerName: 'Payer Name',
      amount: 100,
      description,
      date: '2021-01-01',
    }
  }

  static validWithDate(date: string) {
    return {
      payerId: 1,
      payerName: 'Payer Name',
      amount: 100,
      description: 'Description',
      date,
    }
  }

  static withInvalidPayerId() {
    return {
      payerId: -1,
      payerName: 'Payer Name',
      amount: 100,
      description: 'Description',
      date: '2021-01-01',
    }
  }

  static withInvalidPayerName() {
    return {
      payerId: 1,
      payerName: '',
      amount: 100,
      description: 'Description',
      date: '2021-01-01',
    }
  }

  static withInvalidAmount() {
    return {
      payerId: 1,
      payerName: 'Payer Name',
      amount: -100,
      description: 'Description',
      date: '2021-01-01',
    }
  }

  static withInvalidDescription() {
    return {
      payerId: 1,
      payerName: 'Payer Name',
      amount: 100,
      description: '',
      date: '2021-01-01',
    }
  }

  static withInvalidDate() {
    return {
      payerId: 1,
      payerName: 'Payer Name',
      amount: 100,
      description: 'Description',
      date: '20222222222222222222222222221-01-31',
    }
  }

  static invalidAll() {
    return {
      payerId: 0,
      payerName: '',
      amount: 0,
      description: '',
      date: '20222222222222222222222222221-01-31',
    }
  }
}
