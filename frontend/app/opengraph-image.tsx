import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Rotens Trädgård i Bjursås – Handelsträdgård, café & besöksmål i Dalarna'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const logoData = await readFile(join(process.cwd(), 'public', 'images', 'logo-og.png'))
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#344E41',
          padding: '60px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoBase64}
          alt=""
          width={560}
          height={384}
          style={{ objectFit: 'contain' }}
        />
        <div
          style={{
            marginTop: '24px',
            color: '#DAD7CD',
            fontSize: '28px',
            fontWeight: 300,
            letterSpacing: '0.15em',
          }}
        >
          HANDELSTRÄDGÅRD I BJURSÅS, DALARNA
        </div>
      </div>
    ),
    { ...size },
  )
}
