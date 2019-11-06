import React, { Component } from 'react';
import shortid from 'shortid';
import styles from './Dashboard.module.css';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Dashboard extends Component {
    state = {
        amount: 0,
        transactions: [],
        balance: 0,
        income: 0,
        expenses: 0,
    };

    notifyA = () => toast('Введите сумму для проведения операции!');
    notifyB = () => toast('На счету недостаточно средств для проведения операции!');
    notifyD = () => toast('Сумма транзакции должна быть больше нуля!');

    saveTransaction = (amount, type) => {
        const newTransaction = {
            id: shortid.generate(),
            date: new Date().toLocaleString(),
            amount: amount,
            type: type,
        };
        return newTransaction;
    };

    onDeposit = (amount, reset) => {
        if (amount === "") {
            this.notifyA();
            return;
        } if (amount <= 0) {
            this.notifyD();
            return;
        } if (amount > 0) {
            this.setState(({ transactions, balance }) => ({
                transactions: [...transactions, this.saveTransaction(amount, "Deposit")],
                balance: Number(balance) + Number(amount),
            }));
            this.countIncome(this.state.transactions, amount);
            reset();
        }
    };

    onWithdraw = (amount, reset) => {
        if (amount === "") {
            this.notifyA();
            return;
        } if (this.state.balance < amount) {
            this.notifyB();
            return;
        } if (amount < 0) {
            this.notifyD();
            return;
        } if (this.state.balance >= amount) {
            this.setState(({ transactions, balance }) => ({
                transactions: [...transactions, this.saveTransaction(amount, "Withdrawal")],
                balance: Number(balance) - Number(amount),
            }));
            this.countExpenses(this.state.transactions, amount);
            reset();
        }
    };

    countIncome = (transactions, amount) => {
        const totalDepositSum = [...transactions.filter(transaction => transaction.type === "Deposit")
        ].reduce((acc, transaction) => {
            return (Number(acc) + Number(transaction.amount));
        }, Number(amount));
        this.setState({ income: totalDepositSum });
    };

    countExpenses = (transactions, amount) => {
        const totalWithdrawalSum = [...transactions.filter(transaction => transaction.type === "Withdrawal")]
            .reduce((acc, transaction) => {
                return (Number(acc) + Number(transaction.amount));
            }, Number(amount));
        this.setState({ expenses: totalWithdrawalSum });
    };

    render() {
        return <div className={styles.dashboard}>
            <Controls onDeposit={this.onDeposit} onWithdraw={this.onWithdraw} />
            <Balance balance={this.state.balance} income={this.state.income} expenses={this.state.expenses} />
            <TransactionHistory items={this.state.transactions} />
            <ToastContainer />
        </div>
    };
};

export default Dashboard;