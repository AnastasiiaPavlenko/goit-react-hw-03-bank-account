import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';


const TransactionHistory = (props) => (
    <table className={styles.history}>
        <thead className={styles.thead}>
            <tr>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody className={styles.tbody}>
            {props.items.map(item => (
                <tr key={item.id} className={styles.tbody}>
                    <td >{item.type}</td>
                    <td >{item.amount}$</td>
                    <td >{item.date}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

TransactionHistory.propTypes = {
    items: PropTypes.array.isRequired,
};


export default TransactionHistory;