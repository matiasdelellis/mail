/* global OC */

/**
 * ownCloud - Mail
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author Christoph Wurst <christoph@winzerhof-wurst.at>
 * @copyright Christoph Wurst 2015
 */

define(function(require) {
	'use strict';

	var document = require('domready');
	var Mail = require('app');

	/**
	 * Start the application
	 */
	Mail.start();

	Mail.UI.initializeInterface();

	/**
	 * Detects pasted text by browser plugins, and other software.
	 * Check for changes in message bodies every second.
	 */
	setInterval((function() {
		// Begin the loop.
		return function() {

			// Define which elements hold the message body.
			var MessageBody = $('.message-body');

			/**
			 * If the message body is displayed and has content:
			 * Prepare the message body content for processing.
			 * If there is new message body content to process:
			 * Resize the text area.
			 * Toggle the send button, based on whether the message is ready or not.
			 * Prepare the new message body content for future processing.
			 */
			if (MessageBody.val()) {
				var OldMessageBody = MessageBody.val();
				var NewMessageBody = MessageBody.val();
				if (NewMessageBody !== OldMessageBody) {
					MessageBody.trigger('autosize.resize');
					OldMessageBody = NewMessageBody;
				}
			}
		};
	})(), 1000);

	// TODO: create marionette view and encapsulate events
	$(document).on('click', '#forward-button', function() {
		Mail.UI.openForwardComposer();
	});

	// TODO: create marionette view and encapsulate events
	$(document).on('click', '#mail-message .attachment-save-to-cloud', function(event) {
		event.stopPropagation();
		var messageId = $(this).parent().data('messageId');
		var attachmentId = $(this).parent().data('attachmentId');
		Mail.UI.saveAttachment(messageId, attachmentId);
	});

	// TODO: create marionette view and encapsulate events
	$(document).on('click', '#mail-message .attachments-save-to-cloud', function(event) {
		event.stopPropagation();
		var messageId = $(this).data('messageId');
		Mail.UI.saveAttachment(messageId);
	});

	$(document).on('click', '.link-mailto', function(event) {
		Mail.UI.openComposer(event);
	});

	// TODO: create marionette view and encapsulate events
	// close message when close button is tapped on mobile
	$(document).on('click', '#mail-message-close', function() {
		$('#mail-message').addClass('hidden-mobile');
	});

	// TODO: create marionette view and encapsulate events
	// Show the images if wanted
	$(document).on('click', '#show-images-button', function() {
		$('#show-images-text').hide();
		$('iframe').contents().find('img[data-original-src]').each(function() {
			$(this).attr('src', $(this).attr('data-original-src'));
			$(this).show();
		});
		$('iframe').contents().find('[data-original-style]').each(function() {
			$(this).attr('style', $(this).attr('data-original-style'));
		});
	});
});
