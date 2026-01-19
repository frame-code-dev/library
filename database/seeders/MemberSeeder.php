<?php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Member::create([
            'name' => 'Budi Perwira',
            'email' => 'budi@gmail.com',
            'type' => 'student',
            'class_or_position' => 'X IPA 1',
        ]);

        Member::create([
            'name' => 'Siti Aminah',
            'email' => 'siti@gmail.com',
            'type' => 'student',
            'class_or_position' => 'XI IPS 2',
        ]);

        Member::create([
            'name' => 'Pak Ahmad',
            'email' => 'ahmad@gmail.com',
            'type' => 'teacher',
            'class_or_position' => 'Guru Matematika',
        ]);
    }
}
