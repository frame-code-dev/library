<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Riwayat Peminjaman Buku</title>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: #333;
            font-size: 11px;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            color: #6366f1;
            font-size: 20px;
            text-transform: uppercase;
        }
        .header p {
            margin: 5px 0;
            color: #666;
        }
        .report-info {
            margin-bottom: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th {
            background-color: #f8fafc;
            color: #64748b;
            text-transform: uppercase;
            font-weight: bold;
            text-align: left;
            padding: 10px 8px;
            border-bottom: 2px solid #e2e8f0;
        }
        td {
            padding: 10px 8px;
            border-bottom: 1px solid #f1f5f9;
        }
        .status-badge {
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
        }
        .status-borrowed { background-color: #dcfce7; color: #166534; }
        .status-returned { background-color: #f1f5f9; color: #475569; }
        .status-overdue { background-color: #fee2e2; color: #991b1b; }
        .footer {
            margin-top: 30px;
            text-align: right;
            font-style: italic;
            color: #94a3b8;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Riwayat Peminjaman</h1>
        <p>SIPERPU Digital Library</p>
    </div>

    <div class="report-info">
        <table style="width: auto;">
            <tr>
                <td style="border: none; padding: 2px 20px 2px 0; font-weight: bold; color: #64748b;">Tanggal Laporan</td>
                <td style="border: none; padding: 2px 0;">: {{ now()->format('d F Y H:i') }}</td>
            </tr>
            <tr>
                <td style="border: none; padding: 2px 20px 2px 0; font-weight: bold; color: #64748b;">Total Rekaman</td>
                <td style="border: none; padding: 2px 0;">: {{ $borrows->count() }}</td>
            </tr>
        </table>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Anggota</th>
                <th>Buku</th>
                <th>Tgl Pinjam</th>
                <th>Tgl Kembali</th>
                <th>Status</th>
                <th>Denda</th>
            </tr>
        </thead>
        <tbody>
            @foreach($borrows as $index => $borrow)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>
                    <strong>{{ $borrow->member->name }}</strong><br>
                    <span style="color: #64748b; font-size: 9px;">{{ $borrow->member->member_code }}</span>
                </td>
                <td>
                    {{ $borrow->book->title }}<br>
                    <span style="color: #64748b; font-size: 9px;">ISBN: {{ $borrow->book->isbn }}</span>
                </td>
                <td>{{ $borrow->borrowed_at->format('d/m/Y') }}</td>
                <td>{{ $borrow->returned_at ? $borrow->returned_at->format('d/m/Y') : '-' }}</td>
                <td>
                    <span class="status-badge status-{{ $borrow->status }}">
                        {{ strtoupper($borrow->status) }}
                    </span>
                </td>
                <td>{{ $borrow->fine_amount > 0 ? 'Rp ' . number_format($borrow->fine_amount, 0, ',', '.') : '-' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Dicetak otomatis oleh Sistem SIPERPU pada {{ now()->format('d/m/Y H:i:s') }}
    </div>
</body>
</html>
