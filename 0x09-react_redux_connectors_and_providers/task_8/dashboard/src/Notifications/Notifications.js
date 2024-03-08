import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import {
	fetchNotifications,
	markAsAread,
	setNotificationFilter,
} from '../actions/notificationActionCreators';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';
import { getUnreadNotifications } from '../selectors/notificationSelector';

function Notifications(props) {
		const {
			displayDrawer,
			listNotifications,
			handleDisplayDrawer,
			handleHideDrawer,
			markNotificationAsRead,
			setNotificationFilter,
		} = this.props;

		return (
			<div className={css(styles.Noti)}>
				{!displayDrawer ? (
					<div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
						<p>Your notifications</p>
					</div>
				) : (
					<div className={css(styles.Notifications)}>
						<p>Here is the list of notifications</p>
						<button
							type='button'
							className={css(styles.filterButton)}
							id='buttonFilterUrgent'
							onClick={() => {
								setNotificationFilter('URGENT');
							}}
						>
							❗❗
						</button>
						<button
							type='button'
							className={css(styles.filterButton)}
							id='buttonFilterDefault'
							onClick={() => {
								setNotificationFilter('DEFAULT');
							}}
						>
							💠
						</button>
						<ul className={css(styles.ul)}>
							{listNotifications.length === 0 ? (
								<li>
									<p>No notification available yet</p>
								</li>
							) : (
								listNotifications.map((notification, idx) => (
									<NotificationItem
										key={idx}
										id={notification.id}
										html={notification.html}
										type={notification.type}
										value={notification.value}
										markAsRead={markNotificationAsRead}
									/>
								))
							)}
						</ul>
						<button
							aria-label='Close'
							style={{
								position: 'absolute',
								top: '.2rem',
								right: '.2rem',
								background: 'transparent',
								border: 'none',
								cursor: 'pointer',
							}}
							onClick={handleHideDrawer}
						>
							<img src={closeIcon} alt='close-icon' />
						</button>
					</div>
				)}
			</div>
		);
	}
}

Notifications.propTypes = {
	displayDrawer: PropTypes.bool,
	listNotifications: PropTypes.arrayOf(NotificationItemShape),
	handleDisplayDrawer: PropTypes.func,
	handleHideDrawer: PropTypes.func,
	markNotificationAsRead: PropTypes.func,
	setNotificationFilter: PropTypes.func,
};

Notifications.defaultProps = {
	displayDrawer: false,
	listNotifications: [],
	handleDisplayDrawer: () => {},
	handleHideDrawer: () => {},
	markNotificationAsRead: () => {},
	fetchNotifications: () => {},
	setNotificationFilter: () => {},
};

const screenSize = {
	small: '@media screen and (max-width: 900px)',
};

const opacity = {
	from: {
		opacity: 0.5,
	},

	to: {
		opacity: 1,
	},
};

const translate = {
	'0%': {
		transform: 'translateY(0)',
	},

	'50%': {
		transform: 'translateY(-5px)',
	},

	'75%': {
		transform: 'translateY(5px)',
	},

	'100%': {
		transform: 'translateY(0)',
	},
};

const styles = StyleSheet.create({
	Noti: {
		position: 'absolute',
		right: '0',
		marginRight: '20px',
		backgroundColor: 'white',
		[screenSize.small]: {
			position: 'fixed',
			margin: 0,
			top: 0,
			zIndex: 100,
			width: '100%',
		},
	},
	menuItem: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginTop: '20px',
		marginBottom: '20px',
		right: 0,
		zIndex: 1,
		':hover': {
			cursor: 'pointer',
			animationName: [opacity, translate],
			animationDuration: '1s, 0.5s',
			animationIterationCount: 3,
		},
		[screenSize.small]: {
			position: 'inherit',
		},
	},
	Notifications: {
		position: 'relative',
		border: '1px dashed #e1484c',
		padding: '10px',
		width: '100%',
		fontWeight: 'bold',
		animationDuration: '0.8s',
		animationIterationCount: 1,
		animationFillMode: 'forwards',
		[screenSize.small]: {
			height: '100vh',
		},
	},
	ul: {
		marginLeft: '20px',
		marginTop: '20px',
		[screenSize.small]: {
			listStyle: 'none',
			margin: '20px 0 0 0',
		},
	},
});

export default Notifications;
