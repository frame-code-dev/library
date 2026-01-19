<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define Permissions
        $permissions = [
            'users.view', 'users.create', 'users.edit', 'users.delete',
            'roles.view', 'roles.create', 'roles.edit', 'roles.delete',
            'books.view', 'books.create', 'books.edit', 'books.delete',
            'categories.view', 'categories.create', 'categories.edit', 'categories.delete',
            'members.view', 'members.create', 'members.edit', 'members.delete',
            'borrows.view', 'borrows.create', 'borrows.edit',
            'settings.view', 'settings.edit',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Roles and Assign Permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions($permissions);

        $petugasRole = Role::firstOrCreate(['name' => 'petugas']);
        $petugasRole->syncPermissions([
            'books.view', 'books.create', 'books.edit', 'books.delete',
            'categories.view', 'categories.create', 'categories.edit', 'categories.delete',
            'members.view', 'members.create', 'members.edit', 'members.delete',
            'borrows.view', 'borrows.create', 'borrows.edit',
        ]);
    }
}
