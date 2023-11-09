CREATE TABLE `folder` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`name` text NOT NULL,
	`system` text
);
--> statement-breakpoint
CREATE TABLE `folder_rule` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`folder_id` text NOT NULL,
	`value` text NOT NULL,
	FOREIGN KEY (`folder_id`) REFERENCES `folder`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mail` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`from` text NOT NULL,
	`to` text NOT NULL,
	`subject` text,
	`content` text NOT NULL,
	`is_html` integer,
	`folder_id` text NOT NULL,
	`headers` text NOT NULL,
	FOREIGN KEY (`folder_id`) REFERENCES `folder`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mail_attachment` (
	`mail_id` text NOT NULL,
	`filename` text NOT NULL,
	`mime_type` text NOT NULL,
	`disposition` text,
	PRIMARY KEY(`filename`, `mail_id`),
	FOREIGN KEY (`mail_id`) REFERENCES `mail`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mail_envelope` (
	`mail_id` text NOT NULL,
	`type` text NOT NULL,
	`address` text NOT NULL,
	`name` text,
	PRIMARY KEY(`address`, `mail_id`, `type`),
	FOREIGN KEY (`mail_id`) REFERENCES `mail`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `folder_system_unique` ON `folder` (`system`);--> statement-breakpoint
CREATE INDEX `folder_id_created_at_index` ON `mail` (`folder_id`,`created_at`);