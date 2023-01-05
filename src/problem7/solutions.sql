create table balances (id integer, address varchar(100), denom varchar(10), amount varchar(100), block_height varchar(20));
insert into balances (id, address, denom, amount, block_height) values (1, '0x0483043B87B5B146DbEAdCfAeAb44604f7CfB5F1', 'usdc', '-10000', '733759');
insert into balances (id, address, denom, amount, block_height) values (2, '0x0483043B87B5B146DbEAdCfAeAb44604f7CfB5F2', 'swth', '-20000000', '7337510');
insert into balances (id, address, denom, amount, block_height) values (3, '0x0483043B87B5B146DbEAdCfAeAb44604f7CfB5F3', 'usdc', '-50000000000', '7337511');
select * from balances;

create table trades (id integer, address varchar(100), denom varchar(10), amount varchar(100), block_height varchar(20));
insert into trades (id, address, denom, amount, block_height) values (1, '0x0483043B87B5B146DbEAdCfAeAb44604f7CfB5F1', 'swth', '400000000000', '733756');
insert into trades (id, address, denom, amount, block_height) values (2, '0x0483043B87B5B146DbEAdCfAeAb44604f7CfB5F2', 'usdc', '3500000000000', '733757');
insert into trades (id, address, denom, amount, block_height) values (3, '0x0483043B87B5B146DbEAdCfAeAb44604f7CfB5F3', 'swth', '72000000000000', '733758');
insert into trades (id, address, denom, amount, block_height) values (1, '0x0483043B87B5B146DbEAdCfAeAb44604f7CfB5F1', 'swth', '-4000000000', '7337512');
select * from trades;

-- 1. usdc is worth $0.000001
-- 2. swth is worth $0.00000005
-- 3. tmz is worth $0.003


-- Solution ***
select _t.address
from (
    select  t.address,
        CASE
            WHEN t.denom = 'usdc' THEN 0.000001 * t.balance
            WHEN t.denom = 'swth' THEN 0.00000005 * t.balance
            WHEN t.denom = 'tmz' THEN 0.003 * t.balance
        END priceusd
    from (
        select A.address, max(A.block_height) as block_height, A.denom, SUM(CAST(coalesce(B.amount, '0') AS bigint)) as balance from trades as A left join balances as B on A.address = B.address GROUP by A.address, A.denom
    )
    as t 
    order by t.block_height DESC
) as _t where _t.priceusd > 500
