
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Not dumping tablespaces as no INFORMATION_SCHEMA.FILES table on this server
--

--
-- Table structure for table `tracks`
--

DROP TABLE IF EXISTS `tracks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tracks` (
  `idtracks` int(11) NOT NULL auto_increment,
  `albums_idalbums` int(11) NOT NULL,
  `track` varchar(45) default NULL,
  PRIMARY KEY  (`idtracks`),
  KEY `fk_tracks_albums1` (`albums_idalbums`),
  CONSTRAINT `fk_tracks_albums1` FOREIGN KEY (`albums_idalbums`) REFERENCES `albums` (`idalbums`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracks`
--

LOCK TABLES `tracks` WRITE;
/*!40000 ALTER TABLE `tracks` DISABLE KEYS */;
INSERT INTO `tracks` VALUES (1,1,'So What'),(2,1,'Freddie Freeloader'),(3,1,'Blue in Green'),(4,1,'All Blues'),(5,1,'Flamenco Sketches'),(6,2,'Giant Steps'),(7,2,'Cousin Mary'),(8,2,'Countdown'),(9,2,'Spiral'),(10,2,'Syeeda\'s Song Flute'),(11,2,'Naima'),(12,2,'Mr P.C.'),(13,3,'Magical Mystery Tour'),(14,3,'The Fool on the Hill'),(15,3,'Flying'),(16,3,'Blue Jay Way'),(17,3,'Your Mother Should Know'),(18,3,'I Am The Walrus'),(19,3,'Hello, Goodbye'),(20,3,'Strawberry Fields Forever'),(21,4,'With a Little Help From my Friends'),(22,4,'Lucy in the Sky with Diamonds'),(23,4,'When I\'m Sixty-Four'),(24,4,'A Day in the Life'),(25,6,'Trumpet Overture'),(26,6,'The Hebrides'),(27,6,'Overture for Wind Instruments'),(28,7,'Stop That Train'),(29,7,'Stir It Up'),(30,7,'All Day All Night');
/*!40000 ALTER TABLE `tracks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-03-26 15:49:20
