import { takeEvery } from 'redux-saga/effects';

import {
    NEW_NOTIFICATION,
    NOTIFICATION_SAVE_SUCCESS,
    NOTIFICATION_SAVE_FAIL,
} from '../constants';

import { updateNotificationSingleton } from 'actions';

function* newNotification({ newNotification }) {

    let notificationSingleton = {}

    switch (newNotification.notificationType) {
        case NOTIFICATION_SAVE_SUCCESS:
            notificationSingleton = {
                message: 'Event has been recorded',
                open: true,
                priority: 0,
                id: 'event--save-success--' + new Date().getTime(),
            }
            break;
        case NOTIFICATION_SAVE_FAIL:
            notificationSingleton = {
                message: newNotification.message,
                open: true,
                priority: 0,
                id: 'event--save-fail--' + new Date().getTime(),
            }
            break;
        default:
            break;
    }

    // TODO: handle multiple events using this template: https://material-ui.com/demos/snackbars/#consecutive-snackbars

    window._UI_STORE_.dispatch( updateNotificationSingleton( { notificationSingleton } ) );

    yield;
}

export default function* () {
    yield [
        takeEvery(NEW_NOTIFICATION, newNotification),
    ];
}
