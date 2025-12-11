CREATE DATABASE bitbybit;

USE bitbybit;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE builds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) DEFAULT 'Minha Build',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE build_components (
    id INT AUTO_INCREMENT PRIMARY KEY,
    build_id INT NOT NULL,
    category VARCHAR(100) NOT NULL, 
    product_id INT NOT NULL,     
    product_name VARCHAR(255) NOT NULL,
    
    FOREIGN KEY (build_id) REFERENCES builds(id)
    ON DELETE CASCADE
);

CREATE TABLE chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role ENUM('user', 'model') NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) DEFAULT 'Nova Conversa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

TRUNCATE TABLE chat_history;

ALTER TABLE chat_history 
ADD COLUMN conversation_id INT NOT NULL,
ADD FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE;


DROP TABLE IF EXISTS chat_history;
DROP TABLE IF EXISTS conversations;

CREATE TABLE conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) DEFAULT 'Nova Conversa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    conversation_id INT NOT NULL,
    role ENUM('user', 'model') NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);


DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    store VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    link TEXT NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL
);

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 

-- === PROCESSADORES (CPU) ===
('Processador', 'Processador AMD Ryzen 5 5500 3.6GHz', 599.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/1/0/100-100000457box-br.jpg', 
 'https://www.pichau.com.br/processador-amd-ryzen-5-5500-6-core-12-threads-3-6ghz-4-2ghz-turbo-cache-19mb-am4-100-100000457box-br?gad_source=1&gad_campaignid=17412712029&gbraid=0AAAAADvAK934nUYfOlxJYIH_je7TAiKzV&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xMW8jHyo6Xjfpc6py25iMNGcqU0UgD7gmOOnStfH98cZldfewv2lFgaAkKAEALw_wcB', 
 'Processador AMD Ryzen 5™ 5500 com 6 núcleos e 12 threads, Socket AM4 e temperatura máxima 90°C.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'Processador AMD Ryzen 7 5700X3D', 1399.99, 'KaBuM!', 
 'https://images9.kabum.com.br/produtos/fotos/520369/processador-amd-ryzen-7-5700x3d-3-6-ghz-4-1ghz-max-turbo-cache-4mb-8-nucleos-16-threads-am4-video-integrado-100-100001503wof_1708023990_gg.jpg', 
 'https://www.kabum.com.br/produto/520369/processador-amd-ryzen-7-5700x3d-3-0-ghz-4-1ghz-max-turbo-cache-4mb-8-nucleos-16-threads-am4-100-100001503wof', 
 'Processador de alto desempenho para gamers com tecnologia 3D V-Cache.'); --

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'Processador AMD Ryzen 5 8500G', 999.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/processador-amd-ryzen-5-8500g-35ghz-50ghz-turbo-6-cores-12-threads-am5-com-cooler-amd-wraith-stealth-100-100001491box_186183.jpg', 
 'https://www.terabyteshop.com.br/produto/27321/processador-amd-ryzen-5-8500g-35ghz-50ghz-turbo-6-cores-12-threads-am5-com-cooler-amd-wraith-stealth-100-100001491box?gad_source=1&gad_campaignid=16775150533&gbraid=0AAAAADm8AXTSIvO9PGKRpQe7TiYl432LZ&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xOfaXt2zEMLppk6ux06JeGT4KSUraA-7rYw9iveuHEedg5IWtaebh4aAk3MEALw_wcB', 
 'Ryzen 5 8500G com 6 núcleos, ideal para próxima geração de jogos e tarefas multithread.'); --

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'Processador AMD Ryzen 7 8700F', 1699.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/1/0/100-100001590box014210120.jpg', 
 'https://www.pichau.com.br/processador-amd-ryzen-7-8700f-8-cores-16-threads-4-1ghz-5-0ghz-turbo-cache-16mb-am5-100-100001590box?gad_source=1&gad_campaignid=17412712029&gbraid=0AAAAADvAK934nUYfOlxJYIH_je7TAiKzV&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xOXOOaRKYlZKTs-lW4jPT7vuiELEfFDn0SG1Tbx5DcLMH8uI-i36T4aAqM2EALw_wcB', 
 'Processador de 8 núcleos para plataforma AM5, excepcional para jogos e criação de conteúdo.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'Processador AMD Ryzen 9 9950X3D', 4999.00, 'KaBuM!', 
 'https://images1.kabum.com.br/produtos/fotos/609951/amd-ryzen-9-9950x-16-core_1723553287_gg.jpg', 
 'https://www.kabum.com.br/produto/609951/processador-amd-ryzen-9-9950x-4-3-ghz-5-7-ghz-cache-64-mb-16-nucleos-32-threads-am5-100-100001277wof', 
 'A melhor CPU para desktop de 16 núcleos com tecnologia AMD 3D V-Cache™ de 2ª geração.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'Processador Intel Core i7-13700F', 2399.90, 'KaBuM!', 
 'https://images3.kabum.com.br/produtos/fotos/405763/processador-intel-core-i7-13700f-5-2ghz-max-turbo-cache-30mb-16-nucleos-24-threads-lga-1700-bx8071513700f_1672684860_gg.jpg', 
 'https://www.kabum.com.br/produto/405763/processador-intel-core-i7-13700f-5-2ghz-max-turbo-cache-30mb-16-nucleos-24-threads-lga-1700-bx8071513700f?gclsrc=aw.ds&&utm_id=22429436063&gad_source=1&gad_campaignid=22429436063&gbraid=0AAAAADx-HyGk7dfJ81oQC7_cY4wD6CVSx&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xMvUoMcMtjTIFBrRRdCV81uUnsUWhQjlsoTFxUAuA-vUXXEhJFQXSIaAvFxEALw_wcB', 
 'Otimizado para jogadores e produtividade com alto desempenho. Requer placa de vídeo.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'Processador Intel Core i5-13400F', 1299.90, 'KaBuM!', 
'https://images6.kabum.com.br/produtos/fotos/405766/processador-intel-core-i5-13400f-4-6ghz-max-turbo-cache-20mb-10-nucleos-16-threads-lga-1700-bx8071513400f_1672752804_gg.jpg',
 'https://www.kabum.com.br/produto/405766/processador-intel-core-i5-13400f-4-6ghz-max-turbo-cache-20mb-10-nucleos-16-threads-lga-1700-bx8071513400f', 
 'Custo-benefício da 13ª geração, com 10 núcleos e compatível com chipsets Série 600 e 700.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'Processador Intel Core Ultra 7 265K', 3299.90, 'KaBuM!', 
 'https://images8.kabum.com.br/produtos/fotos/645178/processador-intel-core-ultra-7-265k-5-5ghz-ate-20-nucleos-com-suporte-a-pcie-5-0-e-4-0-e-suporte-a-ddr5-bx80768265k_1728593092_gg.jpg', 
 'https://www.kabum.com.br/produto/645178/processador-intel-core-ultra-7-265k-5-5ghz-ate-20-nucleos-com-suporte-a-pcie-5-0-e-4-0-e-suporte-a-ddr5-bx80768265k?gclsrc=aw.ds&&utm_id=22429436063&gad_source=1&gad_campaignid=22429436063&gbraid=0AAAAADx-HyGk7dfJ81oQC7_cY4wD6CVSx&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xOSeBInsGGd6w8gjlmrIrnd-Ih-CBonLMh_B3cManNUIgHDDuYvws8aAkj3EALw_wcB', 
 'Redefine os limites de desempenho com 20 Cores e frequência turbo de 5.5 GHz.'); --

-- === COOLERS ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'Cooler DeepCool AK400', 179.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/cooler-para-processador-deepcool-ak400-120mm-intel-amd-r-ak400-bknnmn-g-1_144162.jpg', 
 'https://www.terabyteshop.com.br/produto/21648/cooler-para-processador-deepcool-ak400-120mm-intel-amd-r-ak400-bknnmn-g-1?gad_source=1&gad_campaignid=16111800134&gbraid=0AAAAADm8AXT1hPFsPTjEvRx5Ce9kQgxbB&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xO-hujZectqiAkFJInVg_DiAuzEEz3s4LGTnTqFZv4S8cbfI5oj5XAaAh5lEALw_wcB', 
 'Refrigerador de CPU altamente compatível com quatro torres de tubos de calor e ventoinha silenciosa.'); --

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'Cooler Water Cooler NZXT Kraken Elite 240 RGB', 1599.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/water-cooler-nzxt-kraken-elite-240-rgb-240mm-aio-lcd-display-white-intel-amd-rl-kr24e-w1_176020.jpg', 
 'https://www.terabyteshop.com.br/produto/25692/water-cooler-nzxt-kraken-elite-240-rgb-240mm-aio-lcd-display-white-intel-amd-rl-kr24e-w1?srsltid=AfmBOoqdzlm3G_I0PQgqw54DgB30QR-o9a_oXWoDB28Swd6XpALvbUW-', 
 'Resfriamento de alto desempenho com display LCD para exibir GIFs e métricas do PC.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'Cooler Water Cooler Pcyes Sangue Frio 3 240mm', 349.90, 'KaBuM!', 
 'https://images2.kabum.com.br/produtos/fotos/609582/water-cooler-pcyes-sangue-frio-3-240mm-amd-e-intel-preto-wcsf3240br_1722540796_gg.jpg', 
 'https://www.kabum.com.br/produto/609582/water-cooler-pcyes-sangue-frio-3-240mm-amd-intel-preto-wcsf3240br', 
 'Combina desempenho superior e qualidade incomparável com design inovador White Ghost.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'Cooler Water Cooler Gigabyte Aorus 360 RGB', 1199.90, 'KaBuM!', 
 'https://images4.kabum.com.br/produtos/fotos/508354/water-cooler-gigabyte-aorus-360-rgb-360mm-intel-amd-preto-gp-aorus-waterforce-ii-360_1721145499_gg.jpg', 
 'https://www.kabum.com.br/produto/508354/water-cooler-gigabyte-aorus-360-rgb-360mm-amd-intel-preto-gp-aorus-waterforce-ii-360?gclsrc=aw.ds&&utm_id=22429436048&gad_source=1&gad_campaignid=22429436048&gbraid=0AAAAADx-HyF26mjQQrJOKNZ9ApqvnTpQd&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xPvdzIHnfnOck3A-RRHoth7Z0EZodnawYdULFyU7ySvJpI3CFesIBcaAggSEALw_wcB', 
 'Para entusiastas que buscam máximo desempenho e personalização com resfriamento eficiente.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'Cooler Water Cooler Cooler Master MasterLiquid 360 Atmos', 1099.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/m/l/mlx-d36m-a25pz-r145545.jpg', 
 'https://www.pichau.com.br/water-cooler-cooler-master-masterliquid-360-atmos-rgb-360mm-preto-mlx-d36m-a25pz-r1?gad_source=1&gad_campaignid=17426909414&gbraid=0AAAAADvAK91d2TTbh55dItdRuwnSeSIuH&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xN-ZzHu3KnIdMqTANA5_hg2xgjr2xM1xbthwGcq4l-L1KCIWr83jrYaAtsJEALw_wcB', 
 'Desempenho excepcionalmente silencioso com ventoinhas SickleFlow Edge.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'Cooler Water Cooler MSI MAG CoreLiquid A15 360', 799.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/water-cooler-msi-mag-coreliquid-a15-360-argb-360mm-intel-amd-preto_235593.jpg', 
 'https://www.terabyteshop.com.br/produto/35674/water-cooler-msi-mag-coreliquid-a15-360-argb-360mm-intel-amd-preto?srsltid=AfmBOoq0wUKQPInoF4GYBcGMi-lab-B6nD8Hs62W5Orr5E0pyC24eRAt', 
 'Design arrojado de inspiração militar com iluminação ARGB GEN2.');--

-- === PLACAS MÃE ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'Placa Mãe Asus B650M-AYW WIFI', 1299.90, 'KaBuM!', 
 'https://images9.kabum.com.br/produtos/fotos/726929/placa-mae-asus-b650m-ayw-wi-fi-am5-matx-ddr5-wi-fi-bluetooth-90mb1ki0-m0eay0_1753876129_gg.jpg', 
 'https://www.kabum.com.br/produto/726929/placa-mae-asus-b650m-ayw-wi-fi-am5-matx-ddr5-wi-fi-bluetooth-90mb1ki0-m0eay0', 
 'Desempenho de última geração, otimizada para Ryzen e com conectividade Wi-Fi 6.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'Placa Mãe Pichau Chronos B550M-CR', 599.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/p/c/pch-b550m-crv136565551.jpg', 
 'https://www.pichau.com.br/placa-mae-pichau-chronos-b550m-cr-ddr4-socket-amd-am4-m-atx-chipset-amd-b550-pch-b550m-cr?gad_source=1&gad_campaignid=17426025554&gbraid=0AAAAADvAK91EsvY64NCnLB1RpwIlW519_&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xNPuY07pMUdKLp1aH5M9l4aAnG2Ensg2rlvHlU05qZM7eprlQYyOTgaAkX3EALw_wcB', 
 'Estabilidade e potência para processadores AMD Ryzen séries 3000 a 5000.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'Placa Mãe Gigabyte B760M Aorus Elite', 1199.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/b/7/b760m-aorus-elite4.jpg', 
 'https://www.pichau.com.br/placa-mae-gigabyte-b760m-aorus-elite-ddr5-socket-lga-1700-m-atx-chipset-intel-b760-b760m-aorus-elite?gad_source=1&gad_campaignid=17426025554&gbraid=0AAAAADvAK91EsvY64NCnLB1RpwIlW519_&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xNvSslSm9TiVj7Aau-fmfV2A2y8OBwhyV6L_3dq2hE7nc_O1f2961gaAlGKEALw_wcB', 
 'Suporte a memórias DDR5, PCIe 4.0 x4 M.2 e LAN 2.5G.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'Placa Mãe ASRock X870 Steel Legend WiFi', 1999.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/placa-mae-asrock-x870-steel-legend-wifi-chipset-x870-amd-am5-atx-ddr5_251116.jpg', 
 'https://www.terabyteshop.com.br/produto/38517/placa-mae-asrock-x870-steel-legend-wifi-chipset-x870-amd-am5-atx-ddr5?gad_source=1&gad_campaignid=20589845431&gbraid=0AAAAADm8AXSFrT_jqQmui7sFqkTNJxJnA&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xNiK1Lz8JkZbJ9a1pC9nggZqpI6gz3h85qgvp8oyG9lTDDiOn6wG8waAqo1EALw_wcB', 
 'Sólida durabilidade e estética irresistível para entusiastas.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'Placa Mãe Asus ROG Strix Z790-A Gaming WiFi II', 2599.90, 'KaBuM!', 
 'https://images2.kabum.com.br/produtos/fotos/521062/placa-mae-asus-rog-strix-z790-a-gaming-wifi-ii-intel-z790-atx-ddr5-90mb1fn0-m0aay0_1723750263_gg.jpg', 
 'https://www.kabum.com.br/produto/521062/placa-mae-asus-rog-strix-z790-a-gaming-wifi-ii-intel-z790-atx-ddr5-preto-90mb1fn0-m0aay0', 
 'VRM robusto para Intel 14th Gen, PCIe 5.0 e WiFi 7.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'Placa Mãe Asus Z890 AYW Gaming WiFi', 1899.90, 'KaBuM!', 
 'https://images9.kabum.com.br/produtos/fotos/642999/placa-mae-asus-z890-ayw-gaming-intel-atx-ddr5-wi-fi-90mb1i60-m0eay0_1730314367_gg.jpg', 
 'https://www.kabum.com.br/produto/642999/placa-mae-asus-z890-ayw-gaming-wifi-w-intel-atx-ddr5-wi-fi-90mb1i60-m0eay0', 
 'Projetada para processadores Intel Core Ultra (Série 2) com recursos de IA avançados.');--

-- === PLACAS DE VÍDEO (GPU) ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'Placa de Vídeo XFX Radeon RX 9060 XT OC Gaming', 3499.90, 'KaBuM!', 
 'https://images3.kabum.com.br/produtos/fotos/870973/placa-de-video-xfx-9600xt-16gb-3-fans-rx-96ts316b7_1748970415_gg.jpg', 
 'https://www.kabum.com.br/produto/870973/placa-de-video-xfx-rx-9060-xt-oc-amd-radeon-16gb-gddr6-128bits-20-gbps-triple-fan-rdna-4-rx-96ts316b7', 
 'Próximo nível de desempenho em 1440p com arquitetura RDNA 4 e Ray Tracing avançado.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'Placa de Vídeo Gigabyte Radeon RX 7600 Gaming OC', 1799.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/g/v/gv-r76gaming-oc-8gd8.jpg', 
 'https://www.pichau.com.br/placa-de-video-gigabyte-radeon-rx-7600-gaming-oc-8gb-gddr6-128-bit-gv-r76gaming-oc-8gd?gad_source=1&gad_campaignid=17423967116&gbraid=0AAAAADvAK90W91qmoWoepqItKrjuR8ON6&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xPiXLKyXQcNEkGIYFfPFlYR7gUfvFDk_JLF1-K3QIxMSRbsyohTqSYaAp-qEALw_wcB', 
 'Desempenho avançado para jogos em 1080p com alta taxa de atualização.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'Placa de Vídeo Palit GeForce RTX 5060 Infinity 3', 2499.90, 'KaBuM!', 
 'https://images1.kabum.com.br/produtos/fotos/776931/placa-de-video-palit-geforce-rtx-5060-infinity-3-nvidia-geforce-8gb-gddr7-128bits-fp4-e-dlss-4-ray-tracing-ne75060019p1-gb2063s_1747394873_gg.jpg', 
 'https://www.kabum.com.br/produto/776931/placa-de-video-palit-geforce-rtx-5060-infinity-3-nvidia-geforce-8gb-gddr7-128bits-fp4-e-dlss-4-ray-tracing-ne75060019p1-gb2063s?gclsrc=aw.ds&&utm_id=22429436057&gad_source=1&gad_campaignid=22429436057&gbraid=0AAAAADx-HyGQSB65udjmTEmehuElsLNFM&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xPCVu1mp9CgfRRzL6YXta9eh7th5yWNxb8lMT9CUlLR7UgXWtkXPHsaAoWJEALw_wcB', 
 'Poder de GPU de alto desempenho em formato compacto para SFF.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'Placa de Vídeo MSI GeForce RTX 5070 12G Shadow', 4299.90, 'KaBuM!', 
 'https://images2.kabum.com.br/produtos/fotos/782142/placa-de-video-msi-rtx-5070-12g-shadow-2x-oc-nvdia-geforce-g5070-12s2c_1749495336_gg.jpg', 
 'https://www.kabum.com.br/produto/782142/placa-de-video-msi-rtx-5070-12g-shadow-2x-oc-nvdia-geforce-12gb-gddr7-opengl-4-6-g-sync-g5070-12s2c?gclsrc=aw.ds&&utm_id=22429436057&gad_source=1&gad_campaignid=22429436057&gbraid=0AAAAADx-HyGQSB65udjmTEmehuElsLNFM&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xPgK4iQpsYW6eXCDKpuj0rvrd6jPX4Vybr3wQloZewX8k49IHG2TfEaAg0WEALw_wcB', 
 '6144 Núcleos CUDA e clock extremo para jogos fluidos e visuais incomparáveis.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'Placa de Vídeo ASRock Radeon RX 9070 XT Challenger', 4599.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/placa-de-video-asrock-amd-radeon-rx-9070-xt-challenger-16gb-gddr6-fsr-ray-tracing-90-ga61zz-00uanf_251614.jpg', 
 'https://www.terabyteshop.com.br/produto/38584/placa-de-video-asrock-amd-radeon-rx-9070-xt-challenger-16gb-gddr6-fsr-ray-tracing-90-ga61zz-00uanf?gad_source=1&gad_campaignid=16138806718&gbraid=0AAAAADm8AXTjnBBTPMeabGpnH6RM6iWC8&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xP_qBGYMx6D5IPmiQe_wv_r1h4_wJTzPwXaYi5ObRmRYm824RY8aJMaAgH_EALw_wcB', 
 'Aceleradores de Ray Tracing poderosos e design com três ventoinhas.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'Placa de Vídeo Asus ROG Astral GeForce RTX 5090', 12999.90, 'KaBuM!', 
 'https://images4.kabum.com.br/produtos/fotos/700804/placa-de-video-rog-astral-gaming-geforce-rtx5090-oc-nvidia-32gb-gddr7-argb-90yv0lw0-m0na00_1737724637_gg.jpg', 
 'https://www.kabum.com.br/produto/700804/placa-de-video-asus-rtx5090-rog-astral-gaming-oc-nvidia-geforce-32gb-gddr7-argb-g-sync-ray-tracing-dlss-4-hdr-90yv0lw0-m0na00', 
 'Primeira placa quad-fan da ROG com câmara de vapor exclusiva e desempenho inigualável.');--

-- === MEMÓRIA RAM ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Memória RAM', 'Memória RAM XPG Spectrix D35G 16GB 3200MHz', 279.90, 'KaBuM!', 
 'https://images6.kabum.com.br/produtos/fotos/474946/memoria-xpg-spectrix-d35g-rgb-16gb-3200mhz-ddr4-cl16-preto-ax4u320016g16a-sbkd35g_1700162057_gg.jpg', 
 'https://www.kabum.com.br/produto/474946/memoria-ram-xpg-spectrix-d35g-rgb-16gb-3200mhz-ddr4-cl16-preto-ax4u320016g16a-sbkd35g?gclsrc=aw.ds&&utm_id=22429436051&gad_source=1&gad_campaignid=22429436051&gbraid=0AAAAADx-HyHnZulk10UWqREo_wNapF6pv&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xMkgHpWBb20qzOt4q2ZDFFlHLfPANVQJcVEFneumFu42JAgJPzjY6UaApJSEALw_wcB', 
 'Memória RGB com estilo e desempenho para setups brancos.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Memória RAM', 'Memória RAM Kingston Fury Beast 16GB DDR5', 389.90, 'KaBuM!', 
 'https://images7.kabum.com.br/produtos/fotos/285967/memoria-kingston-fury-beast-16gb-5600mhz-ddr5-cl40-preto-kf556c40bb-16_1639574788_gg.jpg', 
 'https://www.kabum.com.br/produto/285967/memoria-ram-kingston-fury-beast-16gb-5600mhz-ddr5-cl40-para-intel-xmp-preto-kf556c40bb-16', 
 'Velocidade DDR5 para extrair o máximo do seu sistema.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Memória RAM', 'Memória RAM Corsair Vengeance RGB 16GB DDR5', 459.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/c/m/cmh16gx5m1b5200c40155.jpg', 
 'https://www.pichau.com.br/memoria-corsair-vengeance-rgb-16gb-1x16gb-ddr5-5200mhz-c40-preto-cmh16gx5m1b5200c40?srsltid=AfmBOoo97m88SIot21mmYuoOrZU9v_8KpTGYyFfgIxHflpiIIgi0EVfirxg', 
 'Iluminação RGB dinâmica e alto desempenho Corsair.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Memória RAM', 'Memória RAM Kingston Fury Beast RGB 32GB DDR5', 899.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/memoria-ddr4-kingston-fury-beast-rgb-16gb-3200mhz-black-kf432c16bb2a16_178481.jpg', 
 'https://www.terabyteshop.com.br/produto/26030/memoria-ddr4-kingston-fury-beast-rgb-16gb-3200mhz-black-kf432c16bb2a16?gad_source=1&gad_campaignid=16148027731&gbraid=0AAAAADm8AXQnW9t0aYUqSM0IDrhulGcOY&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xOYWBF8o3Yr0EKYhaKkS7LJV4y2iHaRfqRDmbw3i_INwodQ8phiXnUaAoqwEALw_wcB', 
 'Módulo de 32GB para quem precisa de muita memória e estilo.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Memória RAM', 'Memória RAM XPG Gammix D35 8GB DDR4', 139.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/memoria-ddr4-xpg-gammix-d35-8gb-3200mhz-black-ax4u32008g16a-sbkd35_175566.jpg', 
 'https://www.terabyteshop.com.br/produto/25636/memoria-ddr4-xpg-gammix-d35-8gb-3200mhz-black-ax4u32008g16a-sbkd35?gad_source=1&gad_campaignid=16148027731&gbraid=0AAAAADm8AXQnW9t0aYUqSM0IDrhulGcOY&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xOGGV9u7WjAb65LT0CMNyudEZjfcWlospG3k6641MX9xKDGnv5cJAQaAtKkEALw_wcB', 
 'Opção econômica e eficiente para builds DDR4.');--

-- === ARMAZENAMENTO ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Armazenamento', 'Armazenamento SSD Sandisk Plus 480GB', 229.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/s/d/sdssda-480g-g263212.jpg', 
 'https://www.pichau.com.br/ssd-plus-sandisk-480gb-2-5-sata-iii-6gb-s-leitura-535mb-s-gravacao-445mb-s-sdssda-480g-g26', 
 'SSD SATA confiável para reviver PCs antigos ou armazenamento extra.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Armazenamento', 'Armazenamento SSD Adata Legend 710 512GB', 269.90, 'KaBuM!', 
 'https://images5.kabum.com.br/produtos/fotos/415885/ssd-adata-legend-710-512gb-m-2-2280-pcie-gen3x4-nvme-1-4-leitura-2-400-mb-s-e-gravacao-1-800-mb-s-azul-aleg-710-512gcs_1675085973_gg.jpg', 
 'https://www.kabum.com.br/produto/415885/ssd-adata-legend-710-512gb-m-2-2280-pcie-gen3x4-nvme-1-4-leitura-2-400-mb-s-e-gravacao-1-800-mb-s-azul-aleg-710-512gcs', 
 'Velocidade NVMe acessível para carregamento rápido.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Armazenamento', 'Armazenamento SSD Lexar NQ100 256GB', 149.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/l/n/lnq100x256g-rnnng12.jpg', 
 'https://www.pichau.com.br/ssd-lexar-nq100-256gb-2-5-sata-iii-6gb-s-leitura-550mb-s-gravacao-500mb-s-lnq100x256g-rnnng?gad_source=1&gad_campaignid=17423678867&gbraid=0AAAAADvAK90pT_azM40dPKZmzAkM7GMz8&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xMGWNcejPz_Ba4nuY8QB9qpfaNVyojgiwC0iJ2dOSnaMx1IMk51m0caAphMEALw_wcB', 
 'Solução básica e barata para substituir HDs.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Armazenamento', 'Armazenamento SSD Kingston NV3 1TB', 439.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/ssd-kingston-nv3-1tb-m2-nvme-2280-pcie-40-leitura-6000mbs-e-gravacao-4000mbs-snv3s1000g_211589.jpg', 
 'https://www.terabyteshop.com.br/produto/31564/ssd-kingston-nv3-1tb-m2-nvme-2280-pcie-40-leitura-6000mbs-e-gravacao-4000mbs-snv3s1000g?srsltid=AfmBOor7qVm-cu6VnEgnSyxXy5WLdAGeLCTnYZ5I_fzcHpwxOhwcLreE', 
 'Alta velocidade PCIe 4.0 com 6000MB/s de leitura.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Armazenamento', 'Armazenamento HD WD Purple 4TB', 699.90, 'KaBuM!', 
 'https://images8.kabum.com.br/produtos/fotos/sync_mirakl/580058/xlarge/Hd-WD-Purple-4TB-Sata3-Para-Vigilancia-Wd43purz_1757361598.jpg', 
 'https://www.kabum.com.br/produto/580058/hd-wd-purple-4tb-sata3-para-vigilancia-wd43purz?gclsrc=aw.ds&&utm_id=21434223532&gad_source=1&gad_campaignid=21423802761&gbraid=0AAAAADx-HyFCdngptzy0D2f9Yo3gyAixn&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xNaUtLk35H-W2Vu8qPgd9qL9EzSndph4aMD0ahCPuID6_mSTP_Dka4aAkblEALw_wcB', 
 'Ideal para armazenamento em massa e sistemas de vigilância.');--

-- === FONTES ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'Fonte Husky Sledger 950W Platinum', 899.90, 'KaBuM!', 
 'https://images6.kabum.com.br/produtos/fotos/514896/fonte-xpg-core-reactor-ii-ve-850w-75261436_1721238623_gg.jpg', 
 'https://www.kabum.com.br/produto/514896/fonte-xpg-core-reactor-ii-ve-850w-80-plus-gold-modular-pfc-ativo-preto-75261436?gclsrc=aw.ds&&utm_id=22429436054&gad_source=1&gad_campaignid=22429436054&gbraid=0AAAAADx-HyFmDw8zmZBg62xlUKcrgqoMZ&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xOxR8dI7C_pXY8EGz5Gnrz6S7fRSH-G3-JHa_hBvfaNNc3Of72Pt-4aAiVtEALw_wcB', 
 'Eficiência Platinum e 950W de potência para setups extremos.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'Fonte MSI MAG A600DN 600W', 289.90, 'KaBuM!', 
 'https://images5.kabum.com.br/produtos/fotos/369655/fonte-msi-mag-a600dn-atx-600w-80-plus-pfc-ativo-entrada-bivolt-preto-306-7zp6b22-809_1667475815_gg.jpg', 
 'https://www.kabum.com.br/produto/369655/fonte-msi-mag-a600dn-600w-80-plus-white-pfc-ativo-com-cabo-preto-306-7zp6b22-809?gclsrc=aw.ds&&utm_id=22429436054&gad_source=1&gad_campaignid=22429436054&gbraid=0AAAAADx-HyFmDw8zmZBg62xlUKcrgqoMZ&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xMlge6xh0xYpKU95RuqargVeI2qj36ZzCnqDaiw6TbNpfqw7-kEidcaAgc0EALw_wcB', 
 'Fonte de entrada confiável da MSI.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'Fonte Gamemax GX700 700W Gold', 449.90, 'KaBuM!', 
 'https://images5.kabum.com.br/produtos/fotos/sync_mirakl/506265/xlarge/Fonte-ATX-Gamemax-Gx700-700W-80-Plus-Gold-Pfc-Ativo-Black-Gx700wbkpss7710br_1756982389.jpg', 
 'https://www.kabum.com.br/produto/506265/fonte-atx-gamemax-gx700-700w-80-plus-gold-pfc-ativo-black-gx700wbkpss7710br?gclsrc=aw.ds&&utm_id=21722767675&gad_source=1&gad_campaignid=21722772874&gbraid=0AAAAADx-HyEPgQgTS4O1jcW97MVR0pWQJ&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xOzldv9wd9FqsZA9o2QGkWjB4fHxzUehU9DaWaZNuasjcz2NVhw-P8aApMaEALw_wcB', 
 'Certificação Gold e bom custo-benefício.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'Fonte MSI MAG A850GL 850W Gold', 749.90, 'KaBuM!', 
 'https://images6.kabum.com.br/produtos/fotos/462816/fonte-msi-mag-a850gl-atx-850w-80-plus-gold-modular-pfc-ativo-bivolt-preto_1698349376_gg.jpg', 
 'https://www.kabum.com.br/produto/462816/fonte-msi-mag-a850gl-850w-80-plus-gold-modular-pfc-ativo-com-cabo-preto?gclsrc=aw.ds&&utm_id=22429436054&gad_source=1&gad_campaignid=22429436054&gbraid=0AAAAADx-HyFmDw8zmZBg62xlUKcrgqoMZ&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xNTgufKn-f3RoLIplP0fQfBDWKS3Km_RrAfmJyHTRgXdwWEqmE9s4YaArKEEALw_wcB', 
 'Modular e preparada para as novas GPUs com conector PCIe 5.0.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'Fonte ASRock Steel Legend 850W White', 899.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/fonte-asrock-steel-legend-white-850w-80-plus-gold-cybenetics-platinum-full-modular-atx-31-pcie-51-branco-sl-850gw_221229.jpg', 
 'https://www.terabyteshop.com.br/produto/33214/fonte-asrock-steel-legend-white-850w-80-plus-gold-cybenetics-platinum-full-modular-atx-31-pcie-51-branco-sl-850gw?gad_source=1&gad_campaignid=16145315219&gbraid=0AAAAADm8AXTfm8yro5ryDgMB1blndu6Mv&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xNmL-lh6eBV3Ekg1HNpN0EPR4XqHQjzhoHFONyzxPmsCO-5j1DKOlAaAlA9EALw_wcB', 
 'Design branco impecável e certificação Platinum.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'Fonte Corsair RM1000e 1000W Gold', 1199.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/c/p/cp-9020297-br4.jpg', 
 'https://www.pichau.com.br/fonte-corsair-rm1000e-1000w-full-modular-atx-3-1-pcie-5-1-cybenetics-gold-branco-cp-9020294-br', 
 'Potência de 1000W totalmente modular e silenciosa.');--

-- === GABINETES ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'Gabinete Mymax Kyrios Micro ATX', 189.90, 'KaBuM!', 
 'https://images4.kabum.com.br/produtos/fotos/579124/gabinete-gamer-hyrax-hgb730-mini-tower-m-atx-frente-e-lateral-em-vidro-temperado-branco-hgb730w_1720109882_gg.jpg', 
 'https://www.kabum.com.br/produto/579124/gabinete-gamer-hyrax-hgb730-mini-tower-m-atx-frontal-e-lateral-em-vidro-temperado-sem-fans-branco-hgb730w?gclsrc=aw.ds&&utm_id=22446425993&gad_source=1&gad_campaignid=22446425993&gbraid=0AAAAADx-HyFZZK0RuOoex30gFL6xZbEeN&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xOf-YrXj6857gTVFvyoK61oPjeDMZkUaufS5dj2HCxER_mUiOLZ4f8aApROEALw_wcB', 
 'Compacto e já vem com 3 fans RGB.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'Gabinete Rise Mode Galaxy Glass', 399.90, 'KaBuM!', 
 'https://images9.kabum.com.br/produtos/fotos/320909/gabinete-gamer-rise-mode-galaxy-glass-lateral-em-vidro-temperado-branco-rm-ga-gg-fw_1657736758_gg.jpg', 
 'https://www.kabum.com.br/produto/320909/gabinete-gamer-rise-mode-galaxy-glass-mid-tower-atx-lateral-e-frontal-em-vidro-temperado-sem-fans-branco-rm-ga-gg-fw?gclsrc=aw.ds&&utm_id=22446425993&gad_source=1&gad_campaignid=22446425993&gbraid=0AAAAADx-HyFZZK0RuOoex30gFL6xZbEeN&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xPKfI5M6F-Gv7jHmDv16_aRN5qVYtwdXudXu8CmtgL_ifamoV1vYkkaAsSGEALw_wcB', 
 'Aquário de vidro temperado para exibir seu hardware.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'Gabinete SuperFrame Vhagar', 459.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/gabinete-gamer-superframe-vhagar-mid-tower-vidro-temperado-atx-branco-sem-fan-sf-cs-vgmawsf_253207.jpg', 
 'https://www.terabyteshop.com.br/produto/31123/gabinete-gamer-superframe-vhagar-mid-tower-vidro-temperado-atx-branco-sem-fan-sf-cs-vgmawsf?gad_source=1&gad_campaignid=20821077101&gbraid=0AAAAADm8AXSMGTg9p-csvVFSXp9QMN3cJ&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xPxbFWkNWLonuishaK4WRpsuOhCqJxDHsDrKNroOwzErVYEqx_kC54aAsxPEALw_wcB', 
 'Design moderno e espaçoso para facilitar a montagem.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'Gabinete NZXT H9 Flow', 1399.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/gabinete-gamer-nzxt-h9-flow-mid-tower-vidro-temperado-atx-sem-fonte-com-4-fans-branco-cm-h92fw-01_255983.jpg', 
 'https://www.terabyteshop.com.br/produto/39476/gabinete-gamer-nzxt-h9-flow-mid-tower-vidro-temperado-atx-sem-fonte-com-4-fans-branco-cm-h92fw-01?gad_source=1&gad_campaignid=20821077101&gbraid=0AAAAADm8AXSMGTg9p-csvVFSXp9QMN3cJ&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xM0tHnHGQpGM9dA9-kSHE1oZ1-2XPYnGw1maI6bwmQCVBc9PedkpRcaAjdqEALw_wcB', 
 'Câmara dupla para fluxo de ar superior e estética limpa.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'Gabinete Lian Li O11D EVO RGB', 1599.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/gabinete-gamer-lian-li-o11d-evo-rgb-mid-tower-vidro-temperado-e-atx-preto-sem-fonte-sem-fan-o11dergbx-black_241950.jpg', 
 'https://www.terabyteshop.com.br/produto/27908/gabinete-gamer-lian-li-o11d-evo-rgb-mid-tower-vidro-temperado-e-atx-preto-sem-fonte-sem-fan-o11dergbx-black?srsltid=AfmBOop4S4tkyb76Axj03L1UI_ssrQ01oS4ugYWZuzYudxDMIS0SOpu4', 
 'O gabinete mais icônico e versátil do mercado, agora com RGB.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'Gabinete Cooler Master Sneaker X Red', 2999.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/a/b/abk-sxnn-s38l3-r13.jpg', 
 'https://www.pichau.com.br/gabinete-gamer-cooler-master-sneaker-x-red-mini-tower-fonte-sfx850w-water-cooler-flux-360mm-cabo-riser-pci-e-1-fan-mf120-halo-abk-sxnn-s38l3-r1?srsltid=AfmBOorWpCH29Occiul_2nrFskPTvCImt6-BynqUXNHODKtYcezjqJdr', 
 'Gabinete exclusivo em formato de tênis para colecionadores.');--

-- === MONITORES ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Monitor', 'Monitor SuperFrame Precision 27" 240Hz', 1299.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/monitor-gamer-superframe-precision-27-pol-full-hd-fast-ips-240hz-1ms-freesync-hdr-hdmidp-sfpfb-27240-fhd_222341.jpg', 
 'https://www.terabyteshop.com.br/produto/26875/monitor-gamer-superframe-precision-27-pol-full-hd-fast-ips-240hz-1ms-freesync-hdr-hdmidp-sfpfb-27240-fhd?srsltid=AfmBOoqg7bhPMEusTEKIhtfpqXGgCw7J8DK-mlcr5dK4LjJki8bgcV5c', 
 'Tela curva de 240Hz para fluidez extrema em jogos competitivos.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Monitor', 'Monitor LG UltraGear 24" 144Hz IPS', 999.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/2/4/24gn60r-b6.jpg', 
 'https://www.pichau.com.br/monitor-gamer-lg-ultragear-24-pol-ips-fhd-1ms-144hz-freesync-premium-dp-hdmi-24gn60r-b?srsltid=AfmBOop3oeN5P4NU5FrRLjMCZL_nQqhqgkGu7_t2-JMqYRLA1x_bb_s6', 
 'Qualidade de imagem IPS com a rapidez necessária para e-sports.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Monitor', 'Monitor Dell UltraSharp 27" 4K', 3499.00, 'KaBuM!', 
 'https://images7.kabum.com.br/produtos/fotos/sync_mirakl/534757/xlarge/Monitor-Dell-Ultrasharp-27-U2724d_1749215394.jpg', 
 'https://www.kabum.com.br/produto/534757/monitor-dell-ultrasharp-27-u2724d', 
 'Precisão de cores e resolução 4K para profissionais.');--