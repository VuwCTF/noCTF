import { FileMetadata } from "@noctf/api/datatypes";
import { PassThrough, Readable } from "stream";
import { nanoid } from "nanoid";
import { S3mini } from "s3mini";
import {
  FileProvider,
  FileProviderInstance,
  ProviderFileMetadata,
} from "./types.ts";
import { Static, Type } from "@sinclair/typebox";
import { summarizeFile } from "./summarize.ts";
import { NotImplementedError } from "../../errors.ts";

export const S3FileProviderConfig = Type.Object({
  endpoint: Type.String(),
  region: Type.String({ pattern: "^[a-z0-9-]+$", maxLength: 63 }),
  accessKeyId: Type.String(),
  secretAccessKey: Type.String(),
});
export type S3FileProviderConfig = Static<typeof S3FileProviderConfig>;

export class S3FileProvider implements FileProvider<S3FileProviderInstance> {
  name = "s3";

  getInstance({...config }: S3FileProviderConfig) {
    return new S3FileProviderInstance(config);
  }

  getSchema() {
    return S3FileProviderConfig;
  }
}

export class S3FileProviderInstance implements FileProviderInstance {
  private static SIGNED_URL_WINDOW = 600; // File is active for a max of twice as long as this
  private static readonly PREFIX = "noctf-files/";

  private readonly client;

  constructor(
    config: S3FileProviderConfig,
  ) {
    this.client = new S3mini(config);
  }

  async upload(
    rs: Readable,
    pm: Omit<ProviderFileMetadata, "size">,
  ): ReturnType<FileProviderInstance["upload"]> {
    const dup = new PassThrough();
    rs.pipe(dup);
    const ref = nanoid();
    const path = `${S3FileProviderInstance.PREFIX}${ref}`;
    const [summary, _] = await Promise.all([
      summarizeFile(dup),
      this.client.putAnyObject(path, Readable.toWeb(rs) as ReadableStream, pm.mime),
    ]);
    return { ref, ...summary };
  }

  async delete(ref: string): Promise<void> {
    await this.client.deleteObject(ref);
  }

  async getURL(ref: string): Promise<string> {
    const path = `${S3FileProviderInstance.PREFIX}${ref}`;
    // windowing to improve caching
    // let iat = Math.floor(Date.now() / 1000);
    // iat =
    //   S3FileProviderInstance.SIGNED_URL_WINDOW *
    //   Math.floor(iat / S3FileProviderInstance.SIGNED_URL_WINDOW);
    return await this.client.getPresignedUrl(
      'GET',
      path,
      S3FileProviderInstance.SIGNED_URL_WINDOW * 2);
  }

  async download(): Promise<[Readable, Omit<FileMetadata, "url">]> {
    throw new NotImplementedError("Method not implemented.");
  }
}
