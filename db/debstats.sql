SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `american_rounds` (
  `id` int(11) NOT NULL,
  `pm` int(11) DEFAULT NULL COMMENT 'Prime Minister',
  `dpm` int(11) DEFAULT NULL COMMENT 'Deputy Prime Minister',
  `lo` int(11) DEFAULT NULL COMMENT 'Leader of the Opposition',
  `dlo` int(11) DEFAULT NULL COMMENT 'Deputy Leader of the Opposition',
  `gw` int(11) DEFAULT NULL COMMENT 'Government Whip',
  `ow` int(11) DEFAULT NULL COMMENT 'Opposition Whip',
  `winner` enum('opposition','government') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `britain_rounds` (
  `id` int(11) NOT NULL,
  `pm` int(11) DEFAULT NULL COMMENT 'Prime Minister',
  `dpm` int(11) DEFAULT NULL COMMENT 'Deputy Prime Minister',
  `lo` int(11) DEFAULT NULL COMMENT 'Leader of the Opposition',
  `dlo` int(11) DEFAULT NULL COMMENT 'Deputy Leader of the Opposition',
  `mg` int(11) DEFAULT NULL COMMENT 'Member of Government',
  `gw` int(11) DEFAULT NULL COMMENT 'Government Whip',
  `mo` int(11) DEFAULT NULL COMMENT 'Member of Opposition',
  `ow` int(11) DEFAULT NULL COMMENT 'Opposition Whip',
  `place_g1` tinyint(4) NOT NULL,
  `place_g2` tinyint(4) NOT NULL,
  `place_o1` tinyint(4) NOT NULL,
  `place_o2` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `clubs` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `descr` varchar(200) DEFAULT NULL,
  `fb_page` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `club_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `descr` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `club_in_group` (
  `club` int(11) NOT NULL,
  `club_group` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `debaters` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `surname` varchar(20) NOT NULL,
  `fb_page` varchar(60) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL COMMENT 'User that changed something',
  `type` int(11) NOT NULL COMMENT 'Type of the change (defined by controller)',
  `value` text NOT NULL COMMENT 'Value that defines changed data'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `round_headers` (
  `id` int(11) NOT NULL,
  `event_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `resolution` varchar(200) DEFAULT NULL,
  `host` int(11) NOT NULL COMMENT 'Club group that hosted the event',
  `seriousness` enum('serious','fun') NOT NULL,
  `judge` int(11) DEFAULT NULL,
  `format_american` int(11) DEFAULT NULL COMMENT 'Foreign key not null if this is the actual format',
  `format_britain` int(11) DEFAULT NULL COMMENT 'Foreign key not null if this is the actual format',
  `notes` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user_settings` (
  `id` int(11) NOT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `password` varchar(20) NOT NULL,
  `access` int(11) NOT NULL COMMENT 'Access Level'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `american_rounds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pm` (`pm`),
  ADD KEY `dpm` (`dpm`),
  ADD KEY `lo` (`lo`),
  ADD KEY `dlo` (`dlo`),
  ADD KEY `gw` (`gw`),
  ADD KEY `ow` (`ow`);

ALTER TABLE `britain_rounds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `debater_pm` (`pm`),
  ADD KEY `debater_dpm` (`dpm`),
  ADD KEY `debater_lo` (`lo`),
  ADD KEY `debater_dlo` (`dlo`),
  ADD KEY `debater_mg` (`mg`),
  ADD KEY `debater_gw` (`gw`),
  ADD KEY `debater_mo` (`mo`),
  ADD KEY `debater_ow` (`ow`);

ALTER TABLE `clubs`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `club_groups`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `club_in_group`
  ADD KEY `club` (`club`),
  ADD KEY `club_group` (`club_group`);

ALTER TABLE `debaters`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `user_2` (`user`);

ALTER TABLE `round_headers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `club_group` (`host`),
  ADD KEY `judge` (`judge`),
  ADD KEY `format_american` (`format_american`),
  ADD KEY `format_britain` (`format_britain`);

ALTER TABLE `user_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nickname` (`nickname`);


ALTER TABLE `american_rounds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `britain_rounds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `clubs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `club_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `debaters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `round_headers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `american_rounds`
  ADD CONSTRAINT `american_rounds_ibfk_1` FOREIGN KEY (`dlo`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `american_rounds_ibfk_2` FOREIGN KEY (`dpm`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `american_rounds_ibfk_3` FOREIGN KEY (`gw`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `american_rounds_ibfk_4` FOREIGN KEY (`lo`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `american_rounds_ibfk_5` FOREIGN KEY (`ow`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `american_rounds_ibfk_6` FOREIGN KEY (`pm`) REFERENCES `debaters` (`id`);

ALTER TABLE `britain_rounds`
  ADD CONSTRAINT `britain_rounds_ibfk_1` FOREIGN KEY (`dlo`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `britain_rounds_ibfk_2` FOREIGN KEY (`dpm`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `britain_rounds_ibfk_3` FOREIGN KEY (`gw`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `britain_rounds_ibfk_4` FOREIGN KEY (`lo`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `britain_rounds_ibfk_5` FOREIGN KEY (`mg`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `britain_rounds_ibfk_6` FOREIGN KEY (`mo`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `britain_rounds_ibfk_7` FOREIGN KEY (`ow`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `britain_rounds_ibfk_8` FOREIGN KEY (`pm`) REFERENCES `debaters` (`id`);

ALTER TABLE `club_in_group`
  ADD CONSTRAINT `club_in_group_ibfk_1` FOREIGN KEY (`club`) REFERENCES `clubs` (`id`),
  ADD CONSTRAINT `club_in_group_ibfk_2` FOREIGN KEY (`club_group`) REFERENCES `club_groups` (`id`);

ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user_settings` (`id`);

ALTER TABLE `round_headers`
  ADD CONSTRAINT `round_headers_ibfk_1` FOREIGN KEY (`judge`) REFERENCES `debaters` (`id`),
  ADD CONSTRAINT `round_headers_ibfk_2` FOREIGN KEY (`format_britain`) REFERENCES `britain_rounds` (`id`),
  ADD CONSTRAINT `round_headers_ibfk_3` FOREIGN KEY (`format_american`) REFERENCES `american_rounds` (`id`),
  ADD CONSTRAINT `round_headers_ibfk_4` FOREIGN KEY (`host`) REFERENCES `club_groups` (`id`);

ALTER TABLE `user_settings`
  ADD CONSTRAINT `user_settings_ibfk_1` FOREIGN KEY (`id`) REFERENCES `debaters` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
