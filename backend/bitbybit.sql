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



USE bitbybit;

-- 1. Recriar a tabela para garantir a estrutura correta (com link)
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

-- 2. Inserir os produtos da sua lista
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 

-- === PROCESSADORES (CPU) ===
('Processador', 'AMD Ryzen 5 5500 3.6GHz', 599.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/1/0/100-100000457box-br.jpg', 
 'https://www.pichau.com.br/processador-amd-ryzen-5-5500-6-core-12-threads-3-6ghz-4-2ghz-turbo-cache-19mb-am4-100-100000457box-br?gad_source=1&gad_campaignid=17412712029&gbraid=0AAAAADvAK934nUYfOlxJYIH_je7TAiKzV&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xMW8jHyo6Xjfpc6py25iMNGcqU0UgD7gmOOnStfH98cZldfewv2lFgaAkKAEALw_wcB', 
 'Processador AMD Ryzen 5™ 5500 com 6 núcleos e 12 threads, Socket AM4 e temperatura máxima 90°C.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'AMD Ryzen 7 5700X3D', 1399.99, 'KaBuM!', 
 'https://images9.kabum.com.br/produtos/fotos/520369/processador-amd-ryzen-7-5700x3d-3-6-ghz-4-1ghz-max-turbo-cache-4mb-8-nucleos-16-threads-am4-video-integrado-100-100001503wof_1708023990_gg.jpg', 
 'https://www.kabum.com.br/produto/520369/processador-amd-ryzen-7-5700x3d-3-0-ghz-4-1ghz-max-turbo-cache-4mb-8-nucleos-16-threads-am4-100-100001503wof', 
 'Processador de alto desempenho para gamers com tecnologia 3D V-Cache.'); --

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'AMD Ryzen 5 8500G', 999.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/processador-amd-ryzen-5-8500g-35ghz-50ghz-turbo-6-cores-12-threads-am5-com-cooler-amd-wraith-stealth-100-100001491box_186183.jpg', 
 'https://www.terabyteshop.com.br/produto/27321/processador-amd-ryzen-5-8500g-35ghz-50ghz-turbo-6-cores-12-threads-am5-com-cooler-amd-wraith-stealth-100-100001491box?gad_source=1&gad_campaignid=16775150533&gbraid=0AAAAADm8AXTSIvO9PGKRpQe7TiYl432LZ&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xOfaXt2zEMLppk6ux06JeGT4KSUraA-7rYw9iveuHEedg5IWtaebh4aAk3MEALw_wcB', 
 'Ryzen 5 8500G com 6 núcleos, ideal para próxima geração de jogos e tarefas multithread.'); --

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'AMD Ryzen 7 8700F', 1699.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/1/0/100-100001590box014210120.jpg', 
 'https://www.pichau.com.br/processador-amd-ryzen-7-8700f-8-cores-16-threads-4-1ghz-5-0ghz-turbo-cache-16mb-am5-100-100001590box?gad_source=1&gad_campaignid=17412712029&gbraid=0AAAAADvAK934nUYfOlxJYIH_je7TAiKzV&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xOXOOaRKYlZKTs-lW4jPT7vuiELEfFDn0SG1Tbx5DcLMH8uI-i36T4aAqM2EALw_wcB', 
 'Processador de 8 núcleos para plataforma AM5, excepcional para jogos e criação de conteúdo.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'AMD Ryzen 9 9950X3D', 4999.00, 'KaBuM!', 
 'https://images1.kabum.com.br/produtos/fotos/609951/amd-ryzen-9-9950x-16-core_1723553287_gg.jpg', 
 'https://www.kabum.com.br/produto/609951/processador-amd-ryzen-9-9950x-4-3-ghz-5-7-ghz-cache-64-mb-16-nucleos-32-threads-am5-100-100001277wof', 
 'A melhor CPU para desktop de 16 núcleos com tecnologia AMD 3D V-Cache™ de 2ª geração.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'Intel Core i7-13700F', 2399.90, 'KaBuM!', 
 'https://images3.kabum.com.br/produtos/fotos/405763/processador-intel-core-i7-13700f-5-2ghz-max-turbo-cache-30mb-16-nucleos-24-threads-lga-1700-bx8071513700f_1672684860_gg.jpg', 
 'https://www.kabum.com.br/produto/405763/processador-intel-core-i7-13700f-5-2ghz-max-turbo-cache-30mb-16-nucleos-24-threads-lga-1700-bx8071513700f?gclsrc=aw.ds&&utm_id=22429436063&gad_source=1&gad_campaignid=22429436063&gbraid=0AAAAADx-HyGk7dfJ81oQC7_cY4wD6CVSx&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xMvUoMcMtjTIFBrRRdCV81uUnsUWhQjlsoTFxUAuA-vUXXEhJFQXSIaAvFxEALw_wcB', 
 'Otimizado para jogadores e produtividade com alto desempenho. Requer placa de vídeo.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'Intel Core i5-13400F', 1299.90, 'KaBuM!', 
'https://images6.kabum.com.br/produtos/fotos/405766/processador-intel-core-i5-13400f-4-6ghz-max-turbo-cache-20mb-10-nucleos-16-threads-lga-1700-bx8071513400f_1672752804_gg.jpg',
 'https://www.kabum.com.br/produto/405766/processador-intel-core-i5-13400f-4-6ghz-max-turbo-cache-20mb-10-nucleos-16-threads-lga-1700-bx8071513400f', 
 'Custo-benefício da 13ª geração, com 10 núcleos e compatível com chipsets Série 600 e 700.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Processador', 'Intel Core Ultra 7 265K', 3299.90, 'KaBuM!', 
 'https://images8.kabum.com.br/produtos/fotos/645178/processador-intel-core-ultra-7-265k-5-5ghz-ate-20-nucleos-com-suporte-a-pcie-5-0-e-4-0-e-suporte-a-ddr5-bx80768265k_1728593092_gg.jpg', 
 'https://www.kabum.com.br/produto/645178/processador-intel-core-ultra-7-265k-5-5ghz-ate-20-nucleos-com-suporte-a-pcie-5-0-e-4-0-e-suporte-a-ddr5-bx80768265k?gclsrc=aw.ds&&utm_id=22429436063&gad_source=1&gad_campaignid=22429436063&gbraid=0AAAAADx-HyGk7dfJ81oQC7_cY4wD6CVSx&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xOSeBInsGGd6w8gjlmrIrnd-Ih-CBonLMh_B3cManNUIgHDDuYvws8aAkj3EALw_wcB', 
 'Redefine os limites de desempenho com 20 Cores e frequência turbo de 5.5 GHz.'); --

-- === COOLERS ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'DeepCool AK400', 179.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/cooler-para-processador-deepcool-ak400-120mm-intel-amd-r-ak400-bknnmn-g-1_144162.jpg', 
 'https://www.terabyteshop.com.br/produto/21648/cooler-para-processador-deepcool-ak400-120mm-intel-amd-r-ak400-bknnmn-g-1?gad_source=1&gad_campaignid=16111800134&gbraid=0AAAAADm8AXT1hPFsPTjEvRx5Ce9kQgxbB&gclid=Cj0KCQiA9OnJBhD-ARIsAPV51xO-hujZectqiAkFJInVg_DiAuzEEz3s4LGTnTqFZv4S8cbfI5oj5XAaAh5lEALw_wcB', 
 'Refrigerador de CPU altamente compatível com quatro torres de tubos de calor e ventoinha silenciosa.'); --

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'Water Cooler NZXT Kraken Elite 240 RGB', 1599.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/water-cooler-nzxt-kraken-elite-240-rgb-240mm-aio-lcd-display-white-intel-amd-rl-kr24e-w1_176020.jpg', 
 'https://www.terabyteshop.com.br/produto/25692/water-cooler-nzxt-kraken-elite-240-rgb-240mm-aio-lcd-display-white-intel-amd-rl-kr24e-w1?srsltid=AfmBOoqdzlm3G_I0PQgqw54DgB30QR-o9a_oXWoDB28Swd6XpALvbUW-', 
 'Resfriamento de alto desempenho com display LCD para exibir GIFs e métricas do PC.');--

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'Water Cooler Pcyes Sangue Frio 3 240mm', 349.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/609585/water-cooler-pcyes-sangue-frio-3-240mm-amd-intel-branco-wcsf3240wgbr_1724096043_gg.jpg', 
 'https://www.kabum.com.br/produto/609585/water-cooler-pcyes-sangue-frio-3-240mm-amd-intel-branco-wcsf3240wgbr', 
 'Combina desempenho superior e qualidade incomparável com design inovador White Ghost.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'Water Cooler Gigabyte Aorus 360 RGB', 1199.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/508354/water-cooler-gigabyte-aorus-360-rgb-360mm-amd-intel-preto-gp-aorus-waterforce-ii-360_1703698777_gg.jpg', 
 'https://www.kabum.com.br/produto/508354/water-cooler-gigabyte-aorus-360-rgb-360mm-amd-intel-preto-gp-aorus-waterforce-ii-360', 
 'Para entusiastas que buscam máximo desempenho e personalização com resfriamento eficiente.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'Water Cooler Cooler Master MasterLiquid 360 Atmos', 1099.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/m/l/mlx-d36m-a25pz-r1.jpg', 
 'https://www.pichau.com.br/water-cooler-cooler-master-masterliquid-360-atmos-rgb-360mm-preto-mlx-d36m-a25pz-r1', 
 'Desempenho excepcionalmente silencioso com ventoinhas SickleFlow Edge.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Cooler', 'Water Cooler MSI MAG CoreLiquid A15 360', 799.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/water-cooler-msi-mag-coreliquid-a15-360-argb-360mm-intel-amd-preto_199342.jpg', 
 'https://www.terabyteshop.com.br/produto/35674/water-cooler-msi-mag-coreliquid-a15-360-argb-360mm-intel-amd-preto', 
 'Design arrojado de inspiração militar com iluminação ARGB GEN2.');

-- === PLACAS MÃE ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'Asus B650M-AYW WIFI', 1299.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/919929/placa-mae-asus-b650m-ayw-wifi-ddr5-socket-amd-am5-m-atx-chipset-amd-b650-b650m-ayw-wifi_1727788390_gg.jpg', 
 'https://www.kabum.com.br/produto/919929/placa-mae-asus-b650m-ayw-wifi-ddr5-socket-amd-am5-m-atx-chipset-amd-b650-b650m-ayw-wifi', 
 'Desempenho de última geração, otimizada para Ryzen e com conectividade Wi-Fi 6.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'Pichau Chronos B550M-CR', 599.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/p/c/pch-b550m-cr-5.jpg', 
 'https://www.pichau.com.br/placa-mae-pichau-chronos-b550m-cr-ddr4-socket-amd-am4-m-atx-chipset-amd-b550-pch-b550m-cr', 
 'Estabilidade e potência para processadores AMD Ryzen séries 3000 a 5000.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'Gigabyte B760M Aorus Elite', 1199.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/b/7/b760m-aorus-elite-box.jpg', 
 'https://www.pichau.com.br/placa-mae-gigabyte-b760m-aorus-elite-ddr5-socket-lga-1700-m-atx-chipset-intel-b760-b760m-aorus-elite', 
 'Suporte a memórias DDR5, PCIe 4.0 x4 M.2 e LAN 2.5G.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'ASRock X870 Steel Legend WiFi', 1999.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/placa-mae-asrock-x870-steel-legend-wifi-chipset-x870-amd-am5-atx-ddr5_202888.jpg', 
 'https://www.terabyteshop.com.br/produto/38517/placa-mae-asrock-x870-steel-legend-wifi-chipset-x870-amd-am5-atx-ddr5', 
 'Sólida durabilidade e estética irresistível para entusiastas.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'Asus ROG Strix Z790-A Gaming WiFi II', 2599.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/r/o/rog-strix-z790-a-gaming-wifi-ii.jpg', 
 'https://www.pichau.com.br/placa-mae-asus-rog-strix-z790-a-gaming-wifi-ii-ddr5-lga-1700-atx-chipset-intel-z790-rog-strix-z790-a-gaming-wifi-ii', 
 'VRM robusto para Intel 14th Gen, PCIe 5.0 e WiFi 7.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa Mãe', 'Asus Z890 AYW Gaming WiFi', 1899.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/642999/placa-mae-asus-z890-ayw-gaming-wifi-w-intel-atx-ddr5-wi-fi-90mb1i60-m0eay0_1729272305_gg.jpg', 
 'https://www.kabum.com.br/produto/642999/placa-mae-asus-z890-ayw-gaming-wifi-w-intel-atx-ddr5-wi-fi-90mb1i60-m0eay0', 
 'Projetada para processadores Intel Core Ultra (Série 2) com recursos de IA avançados.');

-- === PLACAS DE VÍDEO (GPU) ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'XFX Radeon RX 9060 XT OC Gaming', 3499.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/870976/placa-de-video-xfx-rx-9060-xt-oc-gaming-amd-radeon-8gb-gddr6-128bits-20-gbps-fidelityfx-rdna-4-rx-96tsw8gbq_1729107937_gg.jpg', 
 'https://www.kabum.com.br/produto/870976/placa-de-video-xfx-rx-9060-xt-oc-gaming-amd-radeon-8gb-gddr6-128bits-20-gbps-fidelityfx-rdna-4-rx-96tsw8gbq', 
 'Próximo nível de desempenho em 1440p com arquitetura RDNA 4 e Ray Tracing avançado.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'Gigabyte Radeon RX 7600 Gaming OC', 1799.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/g/v/gv-r76gaming-oc-8gd.jpg', 
 'https://www.pichau.com.br/placa-de-video-gigabyte-radeon-rx-7600-gaming-oc-8gb-gddr6-128-bit-gv-r76gaming-oc-8gd', 
 'Desempenho avançado para jogos em 1080p com alta taxa de atualização.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'Palit GeForce RTX 5060 Infinity 3', 2499.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/776931/placa-de-video-palit-geforce-rtx-5060-infinity-3-nvidia-geforce-8gb-gddr7-128bits-fp4-e-dlss-4-ray-tracing-ne75060019p1-gb2063s_1729103738_gg.jpg', 
 'https://www.kabum.com.br/produto/776931/placa-de-video-palit-geforce-rtx-5060-infinity-3-nvidia-geforce-8gb-gddr7-128bits-fp4-e-dlss-4-ray-tracing-ne75060019p1-gb2063s', 
 'Poder de GPU de alto desempenho em formato compacto para SFF.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'MSI GeForce RTX 5070 12G Shadow', 4299.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/782142/placa-de-video-msi-rtx-5070-12g-shadow-2x-oc-nvdia-geforce-12gb-gddr7-opengl-4-6-g-sync-g5070-12s2c_1729107937_gg.jpg', 
 'https://www.kabum.com.br/produto/782142/placa-de-video-msi-rtx-5070-12g-shadow-2x-oc-nvdia-geforce-12gb-gddr7-opengl-4-6-g-sync-g5070-12s2c', 
 '6144 Núcleos CUDA e clock extremo para jogos fluidos e visuais incomparáveis.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'ASRock Radeon RX 9070 XT Challenger', 4599.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/placa-de-video-asrock-amd-radeon-rx-9070-xt-challenger-16gb-gddr6-fsr-ray-tracing-90-ga61zz-00uanf_1729107937.jpg', 
 'https://www.terabyteshop.com.br/produto/38584/placa-de-video-asrock-amd-radeon-rx-9070-xt-challenger-16gb-gddr6-fsr-ray-tracing-90-ga61zz-00uanf', 
 'Aceleradores de Ray Tracing poderosos e design com três ventoinhas.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Placa de Vídeo', 'Asus ROG Astral GeForce RTX 5090', 12999.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/700804/placa-de-video-asus-rtx5090-rog-astral-gaming-oc-nvidia-geforce-32gb-gddr7-argb-g-sync-ray-tracing-dlss-4-hdr-90yv0lw0-m0na00_1729107937_gg.jpg', 
 'https://www.kabum.com.br/produto/700804/placa-de-video-asus-rtx5090-rog-astral-gaming-oc-nvidia-geforce-32gb-gddr7-argb-g-sync-ray-tracing-dlss-4-hdr-90yv0lw0-m0na00', 
 'Primeira placa quad-fan da ROG com câmara de vapor exclusiva e desempenho inigualável.');

-- === MEMÓRIA RAM ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Memória RAM', 'XPG Spectrix D35G 16GB 3200MHz', 279.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/512397/memoria-gamer-xpg-spectrix-d35g-16gb-rgb-ddr4-3200-mhz-branco-ax4u320016g16a-swhd35g_1703698777_gg.jpg', 
 'https://www.kabum.com.br/produto/512397/memoria-gamer-xpg-spectrix-d35g-16gb-rgb-ddr4-3200-mhz-branco-ax4u320016g16a-swhd35g', 
 'Memória RGB com estilo e desempenho para setups brancos.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Memória RAM', 'Kingston Fury Beast 16GB DDR5', 389.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/349654/memoria-kingston-fury-beast-16gb-5600mhz-ddr5-cl40-preto-kf556c40bb-16_1660677402_gg.jpg', 
 'https://www.kabum.com.br/produto/349654/memoria-kingston-fury-beast-16gb-5600mhz-ddr5-cl40-preto-kf556c40bb-16', 
 'Velocidade DDR5 para extrair o máximo do seu sistema.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Memória RAM', 'Corsair Vengeance RGB 16GB DDR5', 459.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/c/m/cmh16gx5m1b5200z40.jpg', 
 'https://www.pichau.com.br/memoria-corsair-vengeance-rgb-16gb-1x16gb-ddr5-5200mhz-c40-cinza-cmh16gx5m1b5200z40', 
 'Iluminação RGB dinâmica e alto desempenho Corsair.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Memória RAM', 'Kingston Fury Beast RGB 32GB DDR5', 899.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/memoria-ddr5-kingston-fury-beast-rgb-32gb-5200mhz-black-kf552c40bba-32_155577.jpg', 
 'https://www.terabyteshop.com.br/produto/23983/memoria-ddr5-kingston-fury-beast-rgb-32gb-5200mhz-black-kf552c40bba-32', 
 'Módulo de 32GB para quem precisa de muita memória e estilo.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Memória RAM', 'XPG Gammix D35 8GB DDR4', 139.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/memoria-ddr4-xpg-gammix-d35-8gb-3200mhz-black-ax4u32008g16a-sbkd35_167909.jpg', 
 'https://www.terabyteshop.com.br/produto/25636/memoria-ddr4-xpg-gammix-d35-8gb-3200mhz-black-ax4u32008g16a-sbkd35', 
 'Opção econômica e eficiente para builds DDR4.');

-- === ARMAZENAMENTO ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Armazenamento', 'SSD Sandisk Plus 480GB', 229.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/s/d/sdssda-480g-g26.jpg', 
 'https://www.pichau.com.br/ssd-plus-sandisk-480gb-2-5-sata-iii-6gb-s-leitura-535mb-s-gravacao-445mb-s-sdssda-480g-g26', 
 'SSD SATA confiável para reviver PCs antigos ou armazenamento extra.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Armazenamento', 'SSD Adata Legend 710 512GB', 269.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/a/l/aleg-710-512gcs.jpg', 
 'https://www.pichau.com.br/ssd-adata-legend-710-512gb-m-2-2280-pcie-nvme-leitura-2400-mb-s-gravacao-1800-mb-s-aleg-710-512gcs', 
 'Velocidade NVMe acessível para carregamento rápido.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Armazenamento', 'SSD Lexar NQ100 256GB', 149.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/l/n/lnq100x256g-rnnng.jpg', 
 'https://www.pichau.com.br/ssd-lexar-nq100-256gb-2-5-sata-iii-6gb-s-leitura-550mb-s-gravacao-500mb-s-lnq100x256g-rnnng', 
 'Solução básica e barata para substituir HDs.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Armazenamento', 'SSD Kingston NV3 1TB', 439.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/ssd-kingston-nv3-1tb-m2-nvme-2280-pcie-40-leitura-6000mbs-e-gravacao-4000mbs-snv3s1000g_202888.jpg', 
 'https://www.terabyteshop.com.br/produto/31564/ssd-kingston-nv3-1tb-m2-nvme-2280-pcie-40-leitura-6000mbs-e-gravacao-4000mbs-snv3s1000g', 
 'Alta velocidade PCIe 4.0 com 6000MB/s de leitura.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Armazenamento', 'HD WD Purple 4TB', 699.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/948487/hd-wd-sata-3-5-purple-surveillance-4tb-intellipower-64mb-cache-sata-6-0gb-s-wd40purz-hd-para-seguranca-vigilancia-dvr_1523974958_gg.jpg', 
 'https://www.kabum.com.br/produto/948487/hd-wd-sata-3-5-purple-surveillance-4tb-intellipower-64mb-cache-sata-6-0gb-s-wd40purz-hd-para-seguranca-vigilancia-dvr', 
 'Ideal para armazenamento em massa e sistemas de vigilância.');

-- === FONTES ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'Husky Sledger 950W Platinum', 899.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/597158/fonte-husky-sledger-950w-80-plus-platinum-cybenetics-platinum-pfc-ativo-bivolt-hfn950pt_1715006987_gg.jpg', 
 'https://www.kabum.com.br/produto/597158/fonte-husky-sledger-950w-80-plus-platinum-cybenetics-platinum-pfc-ativo-bivolt-hfn950pt', 
 'Eficiência Platinum e 950W de potência para setups extremos.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'MSI MAG A600DN 600W', 289.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/501552/fonte-msi-mag-a600dn-600w-80-plus-306-7zp6b39-809_1699974258_gg.jpg', 
 'https://www.kabum.com.br/produto/501552/fonte-msi-mag-a600dn-600w-80-plus-306-7zp6b39-809', 
 'Fonte de entrada confiável da MSI.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'Gamemax GX700 700W Gold', 449.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/506265/fonte-atx-gamemax-gx700-700w-80-plus-gold-pfc-ativo-black-gx700wbkpss7710br_1701198428_gg.jpg', 
 'https://www.kabum.com.br/produto/506265/fonte-atx-gamemax-gx700-700w-80-plus-gold-pfc-ativo-black-gx700wbkpss7710br', 
 'Certificação Gold e bom custo-benefício.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'MSI MAG A850GL 850W Gold', 749.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/462816/fonte-msi-mag-a850gl-850w-80-plus-gold-modular-pfc-ativo-com-cabo-preto_1686665798_gg.jpg', 
 'https://www.kabum.com.br/produto/462816/fonte-msi-mag-a850gl-850w-80-plus-gold-modular-pfc-ativo-com-cabo-preto', 
 'Modular e preparada para as novas GPUs com conector PCIe 5.0.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'ASRock Steel Legend 850W White', 899.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/fonte-asrock-steel-legend-white-850w-80-plus-gold-cybenetics-platinum-full-modular-atx-31-pcie-51-branco-sl-850gw_199342.jpg', 
 'https://www.terabyteshop.com.br/produto/33214/fonte-asrock-steel-legend-white-850w-80-plus-gold-cybenetics-platinum-full-modular-atx-31-pcie-51-branco-sl-850gw', 
 'Design branco impecável e certificação Platinum.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Fonte', 'Corsair RM1000e 1000W Gold', 1199.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/c/p/cp-9020294-br.jpg', 
 'https://www.pichau.com.br/fonte-corsair-rm1000e-1000w-full-modular-atx-3-1-pcie-5-1-cybenetics-gold-branco-cp-9020294-br', 
 'Potência de 1000W totalmente modular e silenciosa.');

-- === GABINETES ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'Mymax Kyrios Micro ATX', 189.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/741993/gabinete-gamer-kyrios-micro-atx-3-fans-rbg-branco-mymax_1729107937_gg.jpg', 
 'https://www.kabum.com.br/produto/741993/gabinete-gamer-kyrios-micro-atx-3-fans-rbg-branco-mymax', 
 'Compacto e já vem com 3 fans RGB.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'Rise Mode Galaxy Glass', 399.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/320908/gabinete-gamer-rise-mode-galaxy-glass-mid-tower-atx-lateral-e-frontal-em-vidro-temperado-sem-fans-preto-rm-ga-gg-fb_1653683038_gg.jpg', 
 'https://www.kabum.com.br/produto/320908/gabinete-gamer-rise-mode-galaxy-glass-mid-tower-atx-lateral-e-frontal-em-vidro-temperado-sem-fans-preto-rm-ga-gg-fb', 
 'Aquário de vidro temperado para exibir seu hardware.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'SuperFrame Vhagar', 459.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/gabinete-gamer-superframe-vhagar-mid-tower-vidro-temperado-atx-branco-sem-fan-sf-cs-vgmawsf_199342.jpg', 
 'https://www.terabyteshop.com.br/produto/31123/gabinete-gamer-superframe-vhagar-mid-tower-vidro-temperado-atx-branco-sem-fan-sf-cs-vgmawsf', 
 'Design moderno e espaçoso para facilitar a montagem.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'NZXT H9 Flow', 1399.90, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/439319/gabinete-nzxt-h9-flow-dual-chamber-mid-tower-vidro-360-preto_1684873322_gg.jpg', 
 'https://www.kabum.com.br/produto/439319/gabinete-nzxt-h9-flow-dual-chamber-mid-tower-vidro-360-preto', 
 'Câmara dupla para fluxo de ar superior e estética limpa.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'Lian Li O11D EVO RGB', 1599.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/gabinete-gamer-lian-li-o11d-evo-rgb-mid-tower-vidro-temperado-e-atx-preto-sem-fonte-sem-fan-o11dergbx-black_176378.jpg', 
 'https://www.terabyteshop.com.br/produto/27908/gabinete-gamer-lian-li-o11d-evo-rgb-mid-tower-vidro-temperado-e-atx-preto-sem-fonte-sem-fan-o11dergbx-black', 
 'O gabinete mais icônico e versátil do mercado, agora com RGB.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Gabinete', 'Cooler Master Sneaker X Red', 3999.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/a/b/abk-sxnn-s38l3-r1.jpg', 
 'https://www.pichau.com.br/gabinete-gamer-cooler-master-sneaker-x-red-mini-tower-fonte-sfx850w-water-cooler-flux-360mm-cabo-riser-pci-e-1-fan-mf120-halo-abk-sxnn-s38l3-r1', 
 'Gabinete exclusivo em formato de tênis para colecionadores.');

-- === MONITORES ===
INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Monitor', 'SuperFrame Precision 27" 240Hz', 1299.90, 'Terabyte', 
 'https://img.terabyteshop.com.br/produto/g/monitor-gamer-superframe-precision-27-pol-curvo-full-hd-va-240hz-1ms-freesync-hdmidp-sfp2715_139930.jpg', 
 'https://www.terabyteshop.com.br/produto/22209/monitor-gamer-superframe-precision-27-pol-curvo-full-hd-va-240hz-1ms-freesync-hdmidp-sfp2715', 
 'Tela curva de 240Hz para fluidez extrema em jogos competitivos.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Monitor', 'LG UltraGear 24" 144Hz IPS', 999.90, 'Pichau', 
 'https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e5f1dc3189736166e3/2/4/24gn60r-b.awzm6.jpg', 
 'https://www.pichau.com.br/monitor-gamer-lg-ultragear-24-ips-fhd-144hz-1ms-hdmi-dp-24gn60r-b', 
 'Qualidade de imagem IPS com a rapidez necessária para e-sports.');

INSERT INTO products (category, name, price, store, image_url, link, description) VALUES 
('Monitor', 'Dell UltraSharp 27" 4K', 3499.00, 'KaBuM!', 
 'https://images.kabum.com.br/produtos/fotos/254420/monitor-dell-u2723qe-27-4k-uhd-ips-60hz-5ms-hdmi-displayport-usb-c-vesa-ajustavel-u2723qe_1636113702_gg.jpg', 
 'https://www.kabum.com.br/produto/254420/monitor-dell-27-4k-uhd-ips-60hz-5ms-hdmi-displayport-usb-c-vesa-ajustavel-u2723qe', 
 'Precisão de cores e resolução 4K para profissionais.');