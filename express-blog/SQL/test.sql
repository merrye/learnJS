/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50719
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2018-01-20 21:40:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `href` varchar(255) NOT NULL,
  `eng_title` varchar(255) DEFAULT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('1', '1', 'This is a image test post.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna vitae velit eleifend interdum at ac nisi. In nec ligula lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu cursus erat, ut dapibus quam. Aliquam eleifend dolor vitae libero pharetra adipiscing. Etiam adipiscing dolor a quam tempor, eu convallis nulla varius. Aliquam sollicitudin risus a porta aliquam. Ut nec velit dolor. Proin eget leo lobortis, aliquam est sed, mollis mauris. Fusce vitae leo pretium massa accumsan condimentum. Fusce malesuada gravida lectus vel vulputate. Donec bibendum porta nibh ut aliquam.\r\n\r\nSed lorem felis, congue non fringilla eu, aliquam eu eros. Curabitur orci libero, mollis sed semper vitae, adipiscing in lectus. Aenean non egestas odio. Donec sollicitudin nisi quis lorem gravida, in pharetra mauris fringilla. Duis sit amet faucibus dolor, id aliquam neque. In egestas, odio gravida tempor dictum, mauris felis faucibus purus, sit amet commodo lacus diam vitae est. Ut ut quam eget massa semper sodales. Aenean non ipsum cursus, blandit lectus in, ornare odio. Curabitur ultrices porttitor vulputate.', '/article/2016/12/26/a.html', null, '2016/12/26', '2016/12/26', '0');
INSERT INTO `articles` VALUES ('2', '30624700', 'This post doesn’t have a title. Make sure it’s accessible.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna vitae velit eleifend interdum at ac nisi. In nec ligula lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu cursus erat, ut dapibus quam. Aliquam eleifend dolor vitae libero pharetra adipiscing. Etiam adipiscing dolor a quam tempor, eu convallis nulla varius. Aliquam sollicitudin risus a porta aliquam. Ut nec velit dolor. Proin eget leo lobortis, aliquam est sed, mollis mauris. Fusce vitae leo pretium massa accumsan condimentum. Fusce malesuada gravida lectus vel vulputate. Donec bibendum porta nibh ut aliquam.\r\n\r\nSed lorem felis, congue non fringilla eu, aliquam eu eros. Curabitur orci libero, mollis sed semper vitae, adipiscing in lectus. Aenean non egestas odio. Donec sollicitudin nisi quis lorem gravida, in pharetra mauris fringilla. Duis sit amet faucibus dolor, id aliquam neque. In egestas, odio gravida tempor dictum, mauris felis faucibus purus, sit amet commodo lacus diam vitae est. Ut ut quam eget massa semper sodales. Aenean non ipsum cursus, blandit lectus in, ornare odio. Curabitur ultrices porttitor vulputate.', '/article/2014/02/24/b.html', null, '2014/02/24', '2014/02/24', '0');
INSERT INTO `articles` VALUES ('3', 'EXCERPTS', 'The following contents should be invisible in home/archive page. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna vitae velit eleife...', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna vitae velit eleifend interdum at ac nisi. In nec ligula lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu cursus erat, ut dapibus quam. Aliquam eleifend dolor vitae libero pharetra adipiscing. Etiam adipiscing dolor a quam tempor, eu convallis nulla varius. Aliquam sollicitudin risus a porta aliquam. Ut nec velit dolor. Proin eget leo lobortis, aliquam est sed, mollis mauris. Fusce vitae leo pretium massa accumsan condimentum. Fusce malesuada gravida lectus vel vulputate. Donec bibendum porta nibh ut aliquam.\r\n\r\nSed lorem felis, congue non fringilla eu, aliquam eu eros. Curabitur orci libero, mollis sed semper vitae, adipiscing in lectus. Aenean non egestas odio. Donec sollicitudin nisi quis lorem gravida, in pharetra mauris fringilla. Duis sit amet faucibus dolor, id aliquam neque. In egestas, odio gravida tempor dictum, mauris felis faucibus purus, sit amet commodo lacus diam vitae est. Ut ut quam eget massa semper sodales. Aenean non ipsum cursus, blandit lectus in, ornare odio. Curabitur ultrices porttitor vulputate.', '/article/2012/02/20/c.html', null, '2012/02/20', '2012/02/20', '0');
INSERT INTO `articles` VALUES ('4', 'VIDEOS', 'This is a video test post. Youtube Video', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna vitae velit eleifend interdum at ac nisi. In nec ligula lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu cursus erat, ut dapibus quam. Aliquam eleifend dolor vitae libero pharetra adipiscing. Etiam adipiscing dolor a quam tempor, eu convallis nulla varius. Aliquam sollicitudin risus a porta aliquam. Ut nec velit dolor. Proin eget leo lobortis, aliquam est sed, mollis mauris. Fusce vitae leo pretium massa accumsan condimentum. Fusce malesuada gravida lectus vel vulputate. Donec bibendum porta nibh ut aliquam.\r\n\r\nSed lorem felis, congue non fringilla eu, aliquam eu eros. Curabitur orci libero, mollis sed semper vitae, adipiscing in lectus. Aenean non egestas odio. Donec sollicitudin nisi quis lorem gravida, in pharetra mauris fringilla. Duis sit amet faucibus dolor, id aliquam neque. In egestas, odio gravida tempor dictum, mauris felis faucibus purus, sit amet commodo lacus diam vitae est. Ut ut quam eget massa semper sodales. Aenean non ipsum cursus, blandit lectus in, ornare odio. Curabitur ultrices porttitor vulputate.', '/article/2012/01/20/d.html', null, '2012/01/20', '2012/01/20', '0');
INSERT INTO `articles` VALUES ('5', 'GALLERY POST', 'This post contains 4 photos: Widescreen wallpaper Portrait photo Dual widescreen wallpaper Small photo All photos should be displayed properly. From Wallba...', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna vitae velit eleifend interdum at ac nisi. In nec ligula lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu cursus erat, ut dapibus quam. Aliquam eleifend dolor vitae libero pharetra adipiscing. Etiam adipiscing dolor a quam tempor, eu convallis nulla varius. Aliquam sollicitudin risus a porta aliquam. Ut nec velit dolor. Proin eget leo lobortis, aliquam est sed, mollis mauris. Fusce vitae leo pretium massa accumsan condimentum. Fusce malesuada gravida lectus vel vulputate. Donec bibendum porta nibh ut aliquam.\r\n\r\nSed lorem felis, congue non fringilla eu, aliquam eu eros. Curabitur orci libero, mollis sed semper vitae, adipiscing in lectus. Aenean non egestas odio. Donec sollicitudin nisi quis lorem gravida, in pharetra mauris fringilla. Duis sit amet faucibus dolor, id aliquam neque. In egestas, odio gravida tempor dictum, mauris felis faucibus purus, sit amet commodo lacus diam vitae est. Ut ut quam eget massa semper sodales. Aenean non ipsum cursus, blandit lectus in, ornare odio. Curabitur ultrices porttitor vulputate.', '/article/2015/05/20/e.html', null, '2012/05/20', '2012/05/20', '0');
INSERT INTO `articles` VALUES ('6', 'TAG PLUGINS', 'This is a link post without a title. The title should be the link with or without protocol. Clicking on the link should open Google in a new tab or window.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna vitae velit eleifend interdum at ac nisi. In nec ligula lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu cursus erat, ut dapibus quam. Aliquam eleifend dolor vitae libero pharetra adipiscing. Etiam adipiscing dolor a quam tempor, eu convallis nulla varius. Aliquam sollicitudin risus a porta aliquam. Ut nec velit dolor. Proin eget leo lobortis, aliquam est sed, mollis mauris. Fusce vitae leo pretium massa accumsan condimentum. Fusce malesuada gravida lectus vel vulputate. Donec bibendum porta nibh ut aliquam.\r\n\r\nSed lorem felis, congue non fringilla eu, aliquam eu eros. Curabitur orci libero, mollis sed semper vitae, adipiscing in lectus. Aenean non egestas odio. Donec sollicitudin nisi quis lorem gravida, in pharetra mauris fringilla. Duis sit amet faucibus dolor, id aliquam neque. In egestas, odio gravida tempor dictum, mauris felis faucibus purus, sit amet commodo lacus diam vitae est. Ut ut quam eget massa semper sodales. Aenean non ipsum cursus, blandit lectus in, ornare odio. Curabitur ultrices porttitor vulputate.', '/article/2017/06/20/f.html', null, '2017/06/20', '2017/06/20', '0');
INSERT INTO `articles` VALUES ('7', 'WWW.GOOGLE.COM', 'This post contains 4 photos: Widescreen wallpaper Portrait photo Dual widescreen wallpaper Small photo All photos should be displayed properly. From Wallba...', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna vitae velit eleifend interdum at ac nisi. In nec ligula lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu cursus erat, ut dapibus quam. Aliquam eleifend dolor vitae libero pharetra adipiscing. Etiam adipiscing dolor a quam tempor, eu convallis nulla varius. Aliquam sollicitudin risus a porta aliquam. Ut nec velit dolor. Proin eget leo lobortis, aliquam est sed, mollis mauris. Fusce vitae leo pretium massa accumsan condimentum. Fusce malesuada gravida lectus vel vulputate. Donec bibendum porta nibh ut aliquam.\r\n\r\nSed lorem felis, congue non fringilla eu, aliquam eu eros. Curabitur orci libero, mollis sed semper vitae, adipiscing in lectus. Aenean non egestas odio. Donec sollicitudin nisi quis lorem gravida, in pharetra mauris fringilla. Duis sit amet faucibus dolor, id aliquam neque. In egestas, odio gravida tempor dictum, mauris felis faucibus purus, sit amet commodo lacus diam vitae est. Ut ut quam eget massa semper sodales. Aenean non ipsum cursus, blandit lectus in, ornare odio. Curabitur ultrices porttitor vulputate.', '/article/2017/07/20/g.html', null, '2017/07/20', '2017/07/20', '0');
INSERT INTO `articles` VALUES ('8', '日本語テスト', 'This is a Japanese test post. 私は昨日ついにその助力家というのの上よりするたなけれ。 最も今をお話団はちょうどこの前後なかろでくらいに困りがいるたをは帰着考えたなかって、そうにもするでうたらない。 がたを知っないはずも同時に九月をいよいよたありた。 もっと槙さんにぼんやり金少し説明に...', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna vitae velit eleifend interdum at ac nisi. In nec ligula lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu cursus erat, ut dapibus quam. Aliquam eleifend dolor vitae libero pharetra adipiscing. Etiam adipiscing dolor a quam tempor, eu convallis nulla varius. Aliquam sollicitudin risus a porta aliquam. Ut nec velit dolor. Proin eget leo lobortis, aliquam est sed, mollis mauris. Fusce vitae leo pretium massa accumsan condimentum. Fusce malesuada gravida lectus vel vulputate. Donec bibendum porta nibh ut aliquam.\r\n\r\nSed lorem felis, congue non fringilla eu, aliquam eu eros. Curabitur orci libero, mollis sed semper vitae, adipiscing in lectus. Aenean non egestas odio. Donec sollicitudin nisi quis lorem gravida, in pharetra mauris fringilla. Duis sit amet faucibus dolor, id aliquam neque. In egestas, odio gravida tempor dictum, mauris felis faucibus purus, sit amet commodo lacus diam vitae est. Ut ut quam eget massa semper sodales. Aenean non ipsum cursus, blandit lectus in, ornare odio. Curabitur ultrices porttitor vulputate.', '/article/2015/05/20/h.html', null, '2015/05/20', '2015/05/20', '0');
INSERT INTO `articles` VALUES ('9', '中文測試', '打隊馬表手記元起讀代成人速車死食亮說學數包其是不中只市一色職，讓保用且要，告分放選思的都眼黃是要品費；排班場，一難走方面龍爭人大加。點黨了：心眾運。及望香是臺，事到的有意寫北眾賣說負有起……養家手單然出：得說看然屋：好在利之千叫沒？大院氣覺其：成見舉死？衣資題話以微所動笑以李多三開年戰下，資具家書美確同何有生車資...', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna vitae velit eleifend interdum at ac nisi. In nec ligula lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu cursus erat, ut dapibus quam. Aliquam eleifend dolor vitae libero pharetra adipiscing. Etiam adipiscing dolor a quam tempor, eu convallis nulla varius. Aliquam sollicitudin risus a porta aliquam. Ut nec velit dolor. Proin eget leo lobortis, aliquam est sed, mollis mauris. Fusce vitae leo pretium massa accumsan condimentum. Fusce malesuada gravida lectus vel vulputate. Donec bibendum porta nibh ut aliquam.\r\n\r\nSed lorem felis, congue non fringilla eu, aliquam eu eros. Curabitur orci libero, mollis sed semper vitae, adipiscing in lectus. Aenean non egestas odio. Donec sollicitudin nisi quis lorem gravida, in pharetra mauris fringilla. Duis sit amet faucibus dolor, id aliquam neque. In egestas, odio gravida tempor dictum, mauris felis faucibus purus, sit amet commodo lacus diam vitae est. Ut ut quam eget massa semper sodales. Aenean non ipsum cursus, blandit lectus in, ornare odio. Curabitur ultrices porttitor vulputate.', '/article/2017/08/20/i.html', null, '2017/08/20', '2017/08/20', '0');
INSERT INTO `articles` VALUES ('10', 'Images', 'This is a image test post.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget urna vitae velit eleifend interdum at ac nisi. In nec ligula lacus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eu cursus erat, ut dapibus quam. Aliquam eleifend dolor vitae libero pharetra adipiscing. Etiam adipiscing dolor a quam tempor, eu convallis nulla varius. Aliquam sollicitudin risus a porta aliquam. Ut nec velit dolor. Proin eget leo lobortis, aliquam est sed, mollis mauris. Fusce vitae leo pretium massa accumsan condimentum. Fusce malesuada gravida lectus vel vulputate. Donec bibendum porta nibh ut aliquam.\r\n\r\nSed lorem felis, congue non fringilla eu, aliquam eu eros. Curabitur orci libero, mollis sed semper vitae, adipiscing in lectus. Aenean non egestas odio. Donec sollicitudin nisi quis lorem gravida, in pharetra mauris fringilla. Duis sit amet faucibus dolor, id aliquam neque. In egestas, odio gravida tempor dictum, mauris felis faucibus purus, sit amet commodo lacus diam vitae est. Ut ut quam eget massa semper sodales. Aenean non ipsum cursus, blandit lectus in, ornare odio. Curabitur ultrices porttitor vulputate.', '/article/2016/12/26/j.html', null, '2016/12/26', '2016/12/26', '0');
INSERT INTO `articles` VALUES ('11', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2013/10/03/k.html', null, '2013/10/03', '2013/10/03', '0');
INSERT INTO `articles` VALUES ('12', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2012/10/19/l.html', null, '2012/10/19', '2012/10/19', '0');
INSERT INTO `articles` VALUES ('13', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2014/06/19/m.html', null, '2014/06/19', '2014/06/19', '0');
INSERT INTO `articles` VALUES ('14', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2014/06/15/n.html', null, '2014/06/15', '2014/06/15', '0');
INSERT INTO `articles` VALUES ('15', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2017/09/01/o.html', null, '2017/09/01', '2017/09/01', '0');
INSERT INTO `articles` VALUES ('16', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2013/06/15/p.html', null, '2013/06/15', '2013/06/15', '0');
INSERT INTO `articles` VALUES ('17', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2013/06/15/q.html', null, '2013/06/15', '2013/06/15', '0');
INSERT INTO `articles` VALUES ('18', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2013/06/15/r.html', null, '2013/06/15', '2013/06/15', '0');
INSERT INTO `articles` VALUES ('19', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2013/06/15/s.html', null, '2013/06/15', '2013/06/15', '0');
INSERT INTO `articles` VALUES ('20', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2013/06/15/t.html', null, '2013/06/15', '2013/06/15', '0');
INSERT INTO `articles` VALUES ('21', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2017/05/20/u.html', null, '2017/05/20', '2017/05/20', '0');
INSERT INTO `articles` VALUES ('22', 'aasda', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2017/06/20/v.html', null, '2017/06/20', '2017/06/20', '0');
INSERT INTO `articles` VALUES ('23', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2013/06/15/w.html', null, '2013/06/15', '2013/06/15', '0');
INSERT INTO `articles` VALUES ('24', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2013/06/15/x.html', null, '2013/06/15', '2013/06/15', '0');
INSERT INTO `articles` VALUES ('25', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2013/06/15/y.html', null, '2013/06/15', '2013/06/15', '0');
INSERT INTO `articles` VALUES ('26', 'test', 'asdasdadadamkl as', 'asdmkojojadapsodk', '/article/2013/06/15/z.html', null, '2013/06/15', '2013/06/15', '0');
INSERT INTO `articles` VALUES ('27', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/A.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('28', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/B.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('29', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/C.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('30', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/D.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('31', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/E.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('32', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/F.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('33', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/G.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('34', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/H.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('35', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/I.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('36', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2017/12/11/J.html', null, '2017/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('37', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/K.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('38', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/L.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('39', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/M.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('40', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/N.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('41', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/O.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('42', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/P.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('43', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/Q.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('44', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/R.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('45', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/S.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('46', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/T.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('47', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/U.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('48', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2017/10/01/V.html', null, '2017/10/01', '2017/10/01', '0');
INSERT INTO `articles` VALUES ('49', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2017/11/11/W.html', null, '2017/11/11', '2017/11/11', '0');
INSERT INTO `articles` VALUES ('50', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/X.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('51', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/Y.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('52', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/Z.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('53', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/1.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('54', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/2.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('55', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/3.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('56', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/4.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('57', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/5.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('58', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/6.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('59', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/7.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('60', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/8.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('61', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/9.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('62', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/10.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('63', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/11.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('64', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/12.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('65', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/13.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('66', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/14.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('67', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/15.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('68', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/16.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('69', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/17.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('70', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/18.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('71', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/19.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('72', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/20.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('73', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/21.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('74', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/22.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('75', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/23.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('76', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/24.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('77', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/25.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('78', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/26.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('79', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/27.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('80', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/28.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('81', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/29.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('82', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/30.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('83', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/31.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('84', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/32.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('85', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/33.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('86', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/34.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('87', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/35.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('88', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/36.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('89', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/37.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('90', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2017/10/16/38.html', null, '2017/10/16', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('91', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/39.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('92', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2017/11/16/40.html', null, '2017/11/16', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('93', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/41.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('94', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/42.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('95', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/43.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('96', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/44.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('97', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/45.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('98', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/46.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('99', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/11/11/47.html', null, '2017/11/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('100', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2010/12/11/48.html', null, '2010/12/11', '2010/12/11', '0');
INSERT INTO `articles` VALUES ('101', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2017/12/11/49.html', null, '2017/12/11', '2017/12/11', '0');
INSERT INTO `articles` VALUES ('102', 'asdsa', 'asduiaosdhaklsdjl', 'asdlkasjd', '/article/2017/12/1/50.html', null, '2017/12/01', '2017/12/01', '0');
INSERT INTO `articles` VALUES ('122', 'Test', 'It\'s a test article.', '<p>It\'s a test article.</p><p><img src=\"/images/upload/articles-image/9ff831e3gw1fbhaiq9x8uj20rs0pmdlj.jpg\" style=\"max-width:100%;\"><br></p><p>I want to make u merry.</p>', '/article/2017/12/25/eng_title.html', null, '2017/12/25', '2017/12/25', '0');
INSERT INTO `articles` VALUES ('123', '我的2017个人小结', '', '<blockquote style=\"text-align: left;\">2017年，因为有了自己的博客，就琢磨着写篇个人小结回忆过往芸芸。</blockquote><p>&nbsp; &nbsp; &nbsp; &nbsp;2017年，似乎和往年差不多，和差不多的人在差不多的地方过着差不多的生活，似乎是没有一丝丝变化，又或许有些许不同之处。或许今年最开心的莫过于拥有了merrye.com，然后就是做了想做的事，看了想看的电影，读了想读的小说，遇见了想见的人。</p><p>&nbsp; &nbsp; &nbsp; &nbsp;2017年，身边的人似乎是和去年差不多，但或是因为离别，或是因为关系没有以前那么融洽了，但我想，更多的是因为自己的原因，因为自己不知从何时开始，变得懒惰，懒到不再那么的喜欢去找朋友聊天，变得不太爱说话，喜欢沉默，以至于以往些许旧面孔已然在某一时间点开始不再出现于眼前，新的面孔也在此时出现在视野之中，进行着新旧的交替，仿佛之间犹如只见“新”人笑，不见“&nbsp;旧&nbsp;&nbsp;”人哭。但所幸，还有很多朋友一直在我身旁，不曾离去，这使我很欣慰。当然于还有一个人在今年一直在我身边，以至于一看到我，就会问道，“怎么他没有和你一起？”。他，最让我无奈的是，我说他是校草，<img src=\"/images/upload/articles-image/grass.jpg\" style=\"max-width: 100%;\">他非说自己是校花。<img src=\"/images/upload/articles-image/flower.jpg\" style=\"max-width: 100%;\"></p><p>&nbsp; &nbsp; &nbsp; &nbsp;不知道什么缘故，去年看了很多部有趣的电影，读了很多本有趣的小说。其中最喜欢的电影莫过于《十二怼汉》、《泰坦尼克号》和《肖申克的救赎》；最震撼的小说是《1984》，读完之后仿佛自己就生活在“1984”之中；最直击心灵的是余华的作品。当然看过的其他小说，也很不错，耐人寻味。</p><p>&nbsp; &nbsp; &nbsp; &nbsp;在大学，我们寝室都有在12月的最后一天拍上一张集体照的集体活动，以此来纪念过去的一年。<img src=\"/images/upload/articles-image/roommate.jpg\" style=\"max-width: 100%;\"></p><p>或许是觉得，今年如果再不在这个相片中，以后我也许就没有机会再在这个日子里，和大家一起度过一年的最后一天；或许是这样，这样觉得自己如果再不做点什么，在大学里就没有机会，没有时间了，便去了老乡聚会，做了自己的博客，去了想去的地方，看了超级想看的电影。也或许是受到汤老板的影响，闭掉了很长时间的空间、朋友圈，顿时觉得手机没那么好玩，花在手机上的时间也因此少了，想做的事也有了时间去做。（当然我还会出现在Twitter和Ins上，如果你也玩的话，麻烦私我，让我找到组织）</p><p>&nbsp; &nbsp; &nbsp; &nbsp;这一年，或许是因为有了merrye.com，便觉得一切也就没什么遗憾了，即使是有，也不足挂齿了。希望18年也能够不留遗憾，优化博客，做一个MVVM，做一个文本编辑器，做一个好人......&nbsp;<img src=\"/images/upload/articles-image/me.jpg\" style=\"max-width: 100%;\"></p>', '/article/2018/1/1/personal-summary.html', 'personal-summary', '2018/1/1', '2018/1/1', '0');
INSERT INTO `articles` VALUES ('124', '我的2017个人小结', '', '<blockquote style=\"text-align: left;\">2017年，因为有了自己的博客，就琢磨着写篇个人小结回忆过往芸芸。</blockquote><p>', '/article/2018/1/1/eng_title.html', null, '2018/1/2', '2018/1/2', '0');
INSERT INTO `articles` VALUES ('125', 'test', 'asdadasd', '<blockquote>2017年，因为有了自己的博客，就琢磨着写篇个人小结回忆过往芸芸。</blockquote><p>-$-nbsp; -$-nbsp; -$-nbsp; 2017年，似乎和往年差不多，和差不多的人在差不多的地方过着差不多的生活，似乎是没有一丝丝变化，又或许有些许不同之处。或许今年最开心的莫过于拥有了merrye.com，然后就是做了想做的事，看了想看的电影，读了想读的小说，遇见了想见的人。</p><p></p><p>-$-nbsp; -$-nbsp; -$-nbsp; -$-nbsp;2017年，身边的人似乎是和去年差不多，但或是因为离别，或是因为关系没有以前那么融洽了，但我想，更多的是因为自己的原因，因为自己不知从何时开始，变得懒惰，懒到不再那么的喜欢去找朋友聊天，变得不太爱说话，喜欢沉默，以至于以往些许旧面孔已然在某一时间点开始不再出现于眼前，新的面孔也在此时出现在视野之中，进行着新旧的交替，仿佛之间犹如只见“新”人笑，不见“-$-nbsp;旧-$-nbsp;-$-nbsp;”人哭。但所幸，还有很多朋友一直在我身旁，不曾离去，这使我很欣慰。当然于还有一个人在今年一直在我身边，以至于一看到我，就会问道，“怎么他没有和你一起？”。他，最让我无奈的是，我说他是校草，他非说自己是校花。</p><p>-$-nbsp; -$-nbsp; -$-nbsp; -$-nbsp;不知道什么缘故，去年看了很多部有趣的电影，读了很多本有趣的小说。其中最喜欢的电影莫过于《十二怼汉》、《泰坦尼克号》和《肖申克的救赎》；最震撼的小说是《1984》，读完之后仿佛自己就生活在“1984”之中；最直击心灵的是余华的作品。当然看过的其他小说，也很不错，耐人寻味。</p><p>-$-nbsp; -$-nbsp; -$-nbsp; -$-nbsp;在大学，我们寝室都有在12月的最后一天拍上一张集体照的集体活动，以此来纪念过去的一年。或许是觉得，今年如果再不在这个相片中，以后我也许就没有机会再在这个日子里，和大家一起度过一年的最后一天；或许是这样，这样觉得自己如果再不做点什么，在大学里就没有机会，没有时间了，便去了老乡聚会，做了自己的博客，去了想去的地方，看了超级想看的电影。也或许是受到汤老板的影响，闭掉了很长时间的空间、朋友圈，顿时觉得手机没那么好玩，花在手机上的时间也因此少了，想做的事也有了时间去做。（当然我还会出现在Twitter和Ins上，如果你也玩的话，麻烦私我，让我找到组织）</p><p>-$-nbsp; -$-nbsp; -$-nbsp; -$-nbsp;这一年，或许是因为有了merrye.com，便觉得一切也就没什么遗憾了，即使是有，也不足挂齿了。希望18年也能够不留遗憾，优化博客，做一个MVVM，做一个文本编辑器，做一个好人......</p>', '/article/2018/1/4/eng_title.html', 'engi', '2018/1/4', '2018/1/4', '0');
INSERT INTO `articles` VALUES ('127', 'testA', '', '<p><br></p>', '/article/2018/1/20/asd.html', null, '2018/01/20', '2018/01/20', '0');
INSERT INTO `articles` VALUES ('132', 'asdsa', 'test update method', '<p>Adsad</p>', '/article/2018/1/20/.html', null, '2018/01/20', '2018/01/20', '0');

-- ----------------------------
-- Table structure for classifications
-- ----------------------------
DROP TABLE IF EXISTS `classifications`;
CREATE TABLE `classifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `href` varchar(255) NOT NULL,
  `article_id` int(11) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `article_id` (`article_id`),
  CONSTRAINT `classifications_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classifications
-- ----------------------------
INSERT INTO `classifications` VALUES ('6', '杂文', 'essay', '122', '2017/12/25', '2017/12/25', '0');
INSERT INTO `classifications` VALUES ('7', '散文', 'prose', '123', '2018/1/1', '2018/1/1', '0');
INSERT INTO `classifications` VALUES ('8', '散文', 'prose', '124', '2018/1/2', '2018/1/2', '0');
INSERT INTO `classifications` VALUES ('9', '总结', 'summary', '123', '2018/1/1', '2018/1/1', '0');
INSERT INTO `classifications` VALUES ('10', '总结', 'summary', '124', '2018/1/2', '2018/1/2', '0');
INSERT INTO `classifications` VALUES ('11', '总结', 'summary', '122', '2017/12/25', '2017/12/25', '0');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `href` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `artilcle_id` (`article_id`),
  CONSTRAINT `tags_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('1', '1', 'JavaScript', 'js', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('2', '1', 'CSS', 'css', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('3', '2', 'CSS', 'css', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('4', '3', 'CSS3', 'css3', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('5', '3', 'HTML', 'html', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('6', '4', 'HTML', 'html', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('7', '5', 'JAVA', 'java', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('8', '5', 'CSS3', 'css3', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('9', '6', 'VUE', 'vue', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('10', '6', 'python', 'python', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('11', '7', 'Go', 'go', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('12', '8', 'HTML', 'html', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('13', '8', 'jQuery', 'jquery', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('14', '9', 'CSS', 'css', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('15', '9', 'CSS3', 'css3', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('16', '10', 'JAVAEE', 'javaee', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('17', '10', 'CSS', 'css', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('18', '11', 'Bootstrap', 'bootstrap', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('19', '12', 'C', 'c', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('20', '13', 'CSS', 'css', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('21', '14', 'C ++', 'cPlusPlus', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('22', '15', 'Bootstrap', 'bootstrap', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('23', '16', 'CSS3', 'css3', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('24', '17', 'Bootstrap', 'bootstrap', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('25', '18', 'Windows', 'windows', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('26', '19', 'HTML', 'html', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('27', '20', 'JavaScript', 'js', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('28', '21', 'SVG', 'svg', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('29', '22', 'VIM', 'vim', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('30', '23', 'GIT', 'git', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('31', '24', 'Node.js', 'nodejs', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('32', '25', 'PHP', 'php', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('33', '30', 'Canvas', 'canvas', '2016/12/12', '2016/12/12', '0');
INSERT INTO `tags` VALUES ('34', '94', '人工智能', 'artificial-intelligence', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('35', '94', '大数据', 'big-data', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('36', '66', '大数据', 'big-data', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('37', '66', '运维', 'operation-maintenance', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('38', '26', '全栈', 'full-stack', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('39', '36', '前端工程师', 'front-end-engineer', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('40', '46', '全栈', 'full-stack', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('41', '33', '运维', 'operation-maintenance', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('42', '69', '大数据', 'big-data', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('43', '73', 'AI', 'ai', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('44', '77', '共享经济', 'share-economy', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('45', '86', 'ORACLE', 'oracle', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('46', '96', 'Mysql', 'mysql', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('47', '66', '运维', 'operation-maintenance', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('48', '6', '全栈', 'full-stack', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('49', '46', '前端工程师', 'front-end-engineer', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('50', '56', '全栈', 'full-stack', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('51', '32', '运维', 'operation-maintenance', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('52', '60', '大数据', 'big-data', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('53', '13', 'AI', 'ai', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('54', '17', '共享经济', 'share-economy', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('55', '26', 'ORACLE', 'oracle', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('56', '36', 'Mysql', 'mysql', '2014/10/25', '2014/10/25', '0');
INSERT INTO `tags` VALUES ('62', '122', 'test', 'test', '2017/12/25', '2017/12/25', '0');
INSERT INTO `tags` VALUES ('63', '123', '散文', 'prose', '2018/1/1', '2018/1/1', '0');
INSERT INTO `tags` VALUES ('64', '124', '散文', 'prose', '2018/1/2', '2018/1/2', '0');
INSERT INTO `tags` VALUES ('65', '124', '总结', 'summary', '2018/1/2', '2018/1/2', '0');
INSERT INTO `tags` VALUES ('66', '123', '总结', 'summary', '2018/1/1', '2018/1/1', '0');
INSERT INTO `tags` VALUES ('67', '122', 'Node', 'node', '2018/1/1', '2018/1/1', '0');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'Merry', 'b1c4204d7b0c329e2a143c6367383df2', 'admin', '1510227883943', '1510227883943', '0');
INSERT INTO `users` VALUES ('30', 'a', '0b70c45a93510971c12fac6d73d4b948', 'user', '1510473428321', '1510473428321', '0');
INSERT INTO `users` VALUES ('31', 'Merraa', 'b1c4204d7b0c329e2a143c6367383df2', 'user', '1510474819643', '1510474819643', '0');
