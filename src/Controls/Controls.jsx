import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.css';

class Controls extends Component {
    static propTypes = {
        onDeposit: PropTypes.func.isRequired,
        onWithdraw: PropTypes.func.isRequired
    }

    state = { value: "" }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    reset = () => {
        this.setState({ value: '' });
    }

    handleChange = this.handleChange.bind(this);

    render() {
        return <section className={styles.controls} >
            <input type="number" min="0" name="amount" className={styles.input} value={this.state.value} onChange={this.handleChange} />
            <button type="button" className={styles.button} onClick={() => this.props.onDeposit(this.state.value, this.reset)}>Deposit</button>
            <button type="button" className={styles.button} onClick={() => this.props.onWithdraw(this.state.value, this.reset)}>Withdraw</button>
        </section>
    }
};

export default Controls;