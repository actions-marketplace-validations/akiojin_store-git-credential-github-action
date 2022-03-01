import { Git } from './Git';
import { Security } from './Security'

export class GitCredentialManagerCore
{
	static CreateGitCredentialProcess(command)
	{
		return Git.CreateProcess(['credential-manager-core', command]);
	}

	static CreateGitCredentialProcess(command, input)
	{
		return Git.CreateProcess(['credential-manager-core', command], input);
	}

	static async Configure()
	{
		await this.CreateGitCredentialProcess('configure');
		await Git.CreateProcess(['config', '--global', 'credential.interactive', 'false']);
	}

	static async Get()
	{
		await Security.EnableDefaultLoginKeychain();
		await this.CreateGitCredentialProcess('get', 'protocol=https\nhost=github.com\n\n');
	};

	static async Store(username, password)
	{
		await Security.EnableDefaultLoginKeychain();
		await this.CreateGitCredentialProcess('store', `protocol=https\nhost=github.com\nusername=${username}\npassword=${password}\n`);
	};	

	static async Erase()
	{
		await Security.EnableDefaultLoginKeychain();
		await this.CreateGitCredentialProcess('erase', 'protocol=https\nhost=github.com\n');
	};	
}
