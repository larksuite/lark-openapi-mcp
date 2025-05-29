import http from 'http';
import { URL } from 'url';

export interface OAuthCallbackResult {
  code?: string;
  error?: string;
  error_description?: string;
  state?: string;
}

export class OAuthCallbackServer {
  private server: http.Server;
  private port: number;
  private resolve?: (result: OAuthCallbackResult) => void;
  private reject?: (error: Error) => void;

  constructor(port: number = 8080) {
    this.port = port;
    this.server = http.createServer(this.handleRequest.bind(this));
  }

  private handleRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
    if (!req.url) {
      this.sendResponse(res, 400, 'Bad Request');
      return;
    }

    const url = new URL(req.url, `http://localhost:${this.port}`);
    
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');
      const errorDescription = url.searchParams.get('error_description');
      const state = url.searchParams.get('state');

      if (error) {
        this.sendResponse(res, 400, `
          <html>
            <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
              <h1 style="color: #e74c3c;">❌ Authorization Failed</h1>
              <p><strong>Error:</strong> ${error}</p>
              ${errorDescription ? `<p><strong>Description:</strong> ${errorDescription}</p>` : ''}
              <p>You can close this window and try again.</p>
            </body>
          </html>
        `);
        
        if (this.reject) {
          this.reject(new Error(`OAuth error: ${error} - ${errorDescription}`));
        }
        return;
      }

      if (code) {
        this.sendResponse(res, 200, `
          <html>
            <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
              <h1 style="color: #27ae60;">✅ Authorization Successful</h1>
              <p>Authorization code received successfully!</p>
              <p>You can close this window now.</p>
              <script>
                setTimeout(() => window.close(), 3000);
              </script>
            </body>
          </html>
        `);

        if (this.resolve) {
          this.resolve({ code, state: state || undefined });
        }
        return;
      }
    }

    this.sendResponse(res, 404, 'Not Found');
  }

  private sendResponse(res: http.ServerResponse, statusCode: number, body: string): void {
    res.writeHead(statusCode, {
      'Content-Type': statusCode === 200 ? 'text/html' : 'text/plain',
      'Content-Length': Buffer.byteLength(body),
    });
    res.end(body);
  }

  async waitForCallback(timeout: number = 300000): Promise<OAuthCallbackResult> {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;

      const timeoutId = setTimeout(() => {
        this.stop();
        reject(new Error('OAuth callback timeout'));
      }, timeout);

      this.server.listen(this.port, () => {
        console.log(`🌐 OAuth callback server listening on http://localhost:${this.port}/callback`);
      });

      this.server.on('error', (error) => {
        clearTimeout(timeoutId);
        reject(error);
      });

      // Clear timeout and resolve when callback is received
      const originalResolve = this.resolve;
      this.resolve = (result) => {
        clearTimeout(timeoutId);
        this.stop();
        originalResolve(result);
      };

      const originalReject = this.reject;
      this.reject = (error) => {
        clearTimeout(timeoutId);
        this.stop();
        originalReject(error);
      };
    });
  }

  stop(): void {
    if (this.server.listening) {
      this.server.close();
    }
  }
}