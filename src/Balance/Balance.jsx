import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = (props) => (
    <section className={styles.balance}>
        <span >⬆️{props.income}$</span>
        <span >⬇️{props.expenses}$</span>
        <span>Balance: {props.balance}$</span>
    </section>
);

Balance.propTypes = {
    balance: PropTypes.number.isRequired,
    income: PropTypes.number.isRequired,
    expenses: PropTypes.number.isRequired,
};
export default Balance;