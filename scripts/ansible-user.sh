useradd -m -d /home/ansible -s /bin/bash ansible
mkdir /home/ansible/.ssh
echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIBu2meaO1nWKVcBhxX4En3izpB4q1fTeDZFeZtjddaNP justin@ansible' | tee -a /home/ansible/.ssh/authorized_keys
chown -R ansible:ansible /home/ansible/.ssh
chmod 700 /home/ansible/.ssh
chmod 600 /home/ansible/.ssh/authorized_keys
echo 'ansible ALL=(ALL) NOPASSWD:ALL' | tee -a /etc/sudoers.d/ansible