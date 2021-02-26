

    #CREATE DATABSE
    DROP DATABASE IF EXISTS `full_vision`;
    CREATE DATABASE full_vision;
    USE full_vision; 
        
    #CREATE USER TABLE
    DROP TABLE IF EXISTS `users`;
    CREATE TABLE `users` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `username` varchar (255)   DEFAULT NULL, 
    `email` varchar (255)   DEFAULT NULL, 
    `password` varchar (255)   DEFAULT NULL, 
    `created_at` timestamp, 
    `updated_at` timestamp, 

    PRIMARY KEY (`id`)
    
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8; 
    
        
    #CREATE COMMUNITY TABLE
    DROP TABLE IF EXISTS `communities`;
    CREATE TABLE `communities` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar (255)   DEFAULT NULL, 
    `created_at` timestamp, 
    `updated_at` timestamp, 
    `owner_id` int (11)  unsigned DEFAULT NULL, 

    PRIMARY KEY (`id`),
    CONSTRAINT `user_ibfk_0` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8; 
    
        
    #CREATE USER_COMMUNITY TABLE
    DROP TABLE IF EXISTS `user_communities`;
    CREATE TABLE `user_communities` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `created_at` timestamp, 
    `updated_at` timestamp, 
    `subscriber_id` int (11)  unsigned DEFAULT NULL, 
    `community_id` int (11)  unsigned DEFAULT NULL, 

    PRIMARY KEY (`id`),
    CONSTRAINT `user_ibfk_1` FOREIGN KEY (`subscriber_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,CONSTRAINT `community_ibfk_0` FOREIGN KEY (`community_id`) REFERENCES `communities` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8; 
    
        
    #CREATE POST TABLE
    DROP TABLE IF EXISTS `posts`;
    CREATE TABLE `posts` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `title` varchar (255)   DEFAULT NULL, 
    `created_at` timestamp, 
    `updated_at` timestamp, 
    `community_id` int (11)  unsigned DEFAULT NULL, 
    `owner_id` int (11)  unsigned DEFAULT NULL, 

    PRIMARY KEY (`id`),
    CONSTRAINT `community_ibfk_3` FOREIGN KEY (`community_id`) REFERENCES `communities` (`id`) ON DELETE CASCADE,CONSTRAINT `user_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8; 
    
        
    #CREATE COMMENT TABLE
    DROP TABLE IF EXISTS `comments`;
    CREATE TABLE `comments` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `content` varchar (255)   DEFAULT NULL, 
    `created_at` timestamp, 
    `updated_at` timestamp, 
    `subject_type` varchar (25)   DEFAULT NULL, 
    `owner_id` int (11)  unsigned DEFAULT NULL, 
    `subject_id` int (11)  unsigned DEFAULT NULL, 

    PRIMARY KEY (`id`),
    CONSTRAINT `user_ibfk_5` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,CONSTRAINT `user_ibfk_3` FOREIGN KEY (`subject_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,CONSTRAINT `community_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `communities` (`id`) ON DELETE CASCADE,CONSTRAINT `post_ibfk_3` FOREIGN KEY (`subject_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8; 
    
        
    #CREATE VOTE TABLE
    DROP TABLE IF EXISTS `votes`;
    CREATE TABLE `votes` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
    `up_or_down` boolean    DEFAULT NULL, 
    `created_at` timestamp, 
    `updated_at` timestamp, 
    `user_id` int (11)  unsigned DEFAULT NULL, 
    `subject_id` int (11)  unsigned DEFAULT NULL, 

    PRIMARY KEY (`id`),
    CONSTRAINT `user_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,CONSTRAINT `community_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `communities` (`id`) ON DELETE CASCADE,CONSTRAINT `post_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,CONSTRAINT `user_ibfk_4` FOREIGN KEY (`subject_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,CONSTRAINT `comment_ibfk_4` FOREIGN KEY (`subject_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8; 
    
