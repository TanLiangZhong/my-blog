---
title: Centos磁盘挂载
date: '2019-04-10'
sidebar: 'auto'
categories:
- 运维
tags:
- linux
publish: true
---
### 1. 查看所有分区表

```haskell
[root@iZj6chx50rbasf1de8n2flZ /]# fdisk -l

Disk /dev/vda: 64.4 GB, 64424509440 bytes, 125829120 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000b1b45

   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *        2048   125827071    62912512   83  Linux

Disk /dev/vdb: 536.9 GB, 536870912000 bytes, 1048576000 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

### 2. 格式化分区

```haskell
[root@iZj6chx50rbasf1de8n2flZ data]# mkfs.ext4 /dev/vdb
mke2fs 1.42.9 (28-Dec-2013)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
Stride=0 blocks, Stripe width=0 blocks
32768000 inodes, 131072000 blocks
6553600 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=2279604224
4000 block groups
32768 blocks per group, 32768 fragments per group
8192 inodes per group
Superblock backups stored on blocks: 
    32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
    4096000, 7962624, 11239424, 20480000, 23887872, 71663616, 78675968, 
    102400000

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done
```

### 3. 挂载分区

```haskell
[root@iZj6chx50rbasf1de8n2flZ /]# df -h                // 当前只有/dev/vad1/ 挂载在根目录下
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda1        59G  2.9G   54G   6% /
devtmpfs        3.9G     0  3.9G   0% /dev
tmpfs           3.9G     0  3.9G   0% /dev/shm
tmpfs           3.9G  472K  3.9G   1% /run
tmpfs           3.9G     0  3.9G   0% /sys/fs/cgroup
tmpfs           783M     0  783M   0% /run/user/0
[root@iZj6chx50rbasf1de8n2flZ /]# mkdir data        // 创建需要被挂载的目录
[root@iZj6chx50rbasf1de8n2flZ /]# mount /dev/vdb /data      //挂载 /dev/vdb 至 /data 目录
[root@iZj6chx50rbasf1de8n2flZ /]# df -h                 // 可以看到 /dev/vdb 已挂载至 /data
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda1        59G  2.9G   54G   6% /
devtmpfs        3.9G     0  3.9G   0% /dev
tmpfs           3.9G     0  3.9G   0% /dev/shm
tmpfs           3.9G  472K  3.9G   1% /run
tmpfs           3.9G     0  3.9G   0% /sys/fs/cgroup
tmpfs           783M     0  783M   0% /run/user/0
/dev/vdb        493G   73M  467G   1% /data
```

### 4. 开机自动挂载

编辑 `/etc/fstab` 在末尾添加 `/dev/vdb (磁盘分区) /data (挂载目录) ext4 (文件格式) defaults 1 2`

```haskell
[root@iZj6chx50rbasf1de8n2flZ /]# vi /etc/fstab 

# /etc/fstab
# Created by anaconda on Fri Feb 15 09:22:39 2019
#
# Accessible filesystems, by reference, are maintained under '/dev/disk'
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
#
UUID=ed95c595-4813-480e-992b-85b1347842e8 /                       ext4    defaults        1 1
/dev/vdb                                  /data                   ext4    defaults        1 2
```

