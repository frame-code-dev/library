<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Struk Peminjaman - #{{ $borrow->id }}</title>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 30px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #6366f1;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            color: #6366f1;
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .header p {
            margin: 5px 0 0;
            color: #666;
            font-size: 12px;
        }
        .info-grid {
            width: 100%;
            margin-bottom: 30px;
        }
        .info-grid td {
            vertical-align: top;
            padding: 5px 0;
        }
        .label {
            font-weight: bold;
            width: 140px;
            color: #666;
            font-size: 13px;
        }
        .value {
            color: #1a1a1a;
            font-size: 13px;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }
        .details-table th {
            background-color: #f8fafc;
            border-bottom: 2px solid #e2e8f0;
            padding: 12px;
            text-align: left;
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
        }
        .details-table td {
            padding: 15px 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 14px;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
        }
        .badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .badge-borrowed { background-color: #dcfce7; color: #166534; }
        .badge-returned { background-color: #f1f5f9; color: #475569; }
        .badge-overdue { background-color: #fee2e2; color: #991b1b; }
    </style>
</head>
<body>
    <div class="header">
        <h1>SIPERPUreceipt</h1>
        <p>Sistem Informasi Perpustakaan Digital</p>
    </div>

    <table class="info-grid">
        <tr>
            <td class="label">ID Transaksi</td>
            <td class="value">: #{{ str_pad($borrow->id, 5, '0', STR_PAD_LEFT) }}</td>
            <td class="label">Petugas</td>
            <td class="value">: {{ $borrow->user->name }}</td>
        </tr>
        <tr>
            <td class="label">Tanggal Cetak</td>
            <td class="value">: {{ now()->format('d M Y H:i') }}</td>
            <td class="label">Status</td>
            <td class="value">: 
                <span class="badge badge-{{ $borrow->status }}">
                    {{ ucfirst($borrow->status) }}
                </span>
            </td>
        </tr>
    </table>

    <table class="details-table">
        <thead>
            <tr>
                <th>Detail Peminjaman</th>
                <th>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Nama Anggota</strong></td>
                <td>{{ $borrow->member->name }} ({{ $borrow->member->member_code }})</td>
            </tr>
            <tr>
                <td><strong>Judul Buku</strong></td>
                <td>{{ $borrow->book->title }}</td>
            </tr>
            <tr>
                <td><strong>ISBN</strong></td>
                <td>{{ $borrow->book->isbn }}</td>
            </tr>
            <tr>
                <td><strong>Tanggal Pinjam</strong></td>
                <td>{{ $borrow->borrowed_at->format('d F Y') }}</td>
            </tr>
            <tr>
                <td><strong>Batas Kembali</strong></td>
                <td>{{ $borrow->due_at->format('d F Y') }}</td>
            </tr>
            @if($borrow->returned_at)
            <tr>
                <td><strong>Tanggal Kembali</strong></td>
                <td>{{ $borrow->returned_at->format('d F Y') }}</td>
            </tr>
            <tr>
                <td><strong>Denda</strong></td>
                <td>Rp {{ number_format($borrow->fine_amount, 0, ',', '.') }}</td>
            </tr>
            @endif
        </tbody>
    </table>

    <div style="margin-top: 30px;">
        <p style="font-size: 12px; color: #666;">
            <strong>Catatan:</strong><br>
            Harap mengembalikan buku tepat waktu untuk menghindari denda. Keterlambatan akan dikenakan denda sesuai dengan peraturan yang berlaku.
        </p>
    </div>

    <div class="footer">
        Terima kasih telah menggunakan layanan perpustakaan kami.<br>
        &copy; {{ date('Y') }} SIPERPU Digital Library
    </div>
</body>
</html>
