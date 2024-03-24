//
// This is only a SKELETON file for the 'Bank Account' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class BankAccount {
  constructor() {
    this.isOpen = false;
    this.accountBalance = 0;
  }

  open() {
    if (!this.isOpen) {
      this.accountBalance = 0;
      this.isOpen = true;
    } else {
      throw new ValueError('Account is already closed');
    }
  }

  close() {
    if (this.isOpen) {
      this.isOpen = false;
    } else {
      throw new ValueError('Account is already closed');
    }
  }

  deposit(amount) {
    if (this.isOpen) {
      if (amount >= 0) {
        this.accountBalance += amount;
      } else {
        throw new ValueError('Bank account error');
      }
    } else {
      throw new ValueError('Account is already closed');
    }
  }

  withdraw(amount) {
    if (this.isOpen) {
      if (amount >= 0) {
        if (this.accountBalance >= amount) {
          this.accountBalance -= amount;
        } else {
          throw new ValueError('Not enough balance to complete the transaction');
        }
      } else {
        throw new ValueError('Invalid withdrawal amount');
      }
    } else {
      throw new ValueError('Account is already closed');
    }
  }

  get balance() {
    if (!this.isOpen) {
      throw new ValueError('Account is already closed');
    } else {
      return this.accountBalance;
    }
  }

  set balance(newBalance) {
    if (this.isOpen) {
      throw new ValueError('Cannot set balance directly');
    } else if (!this.isOpen) {
      throw new ValueError('Account is already closed');
    } else {
      this.accountBalance = newBalance;
    }
  }
}

export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}
